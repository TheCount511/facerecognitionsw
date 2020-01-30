import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: 'd5346ad8de3c48378369ecd363c69cc7'
});

const particlesParams = {
    particles: {
        number: {
            value: 90,
            density: { enable: true, value_area: 800 }
        },
    }
} 

class App extends Component {
    constructor() {
        super();
        this.state = { input: '', imageUrl: '', box: '' }
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('input-image');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayBox = (box) => { this.setState({ box: box }) }
    
     onButtonSubmit = () => {
        this.setState({ imageUrl: this.state.input })
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => this.displayBox(this.calculateFaceLocation(response))).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="App">
    <Particles className='particles'
              params={particlesParams}
            />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/>
    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
    </div>
        );
    }
}
export default App;