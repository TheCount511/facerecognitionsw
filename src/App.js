import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register';
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
        this.state = {
            input: '',
            imageUrl: '',
            box: '',
            route: 'signIn',
            isSignedIn: false
        }
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

    onRouteChange = (route) => {
        if (route === 'signIn') {
            this.setState({ isSignedIn: false })
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: route });
    }

    render() {        
      const {isSignedIn, route, box, imageUrl}=this.state;

        return (
            <div className="App">
  
    <Particles className='particles'
              params={particlesParams}
            />
                        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route==='register'?
      <Register onRouteChange={this.onRouteChange} /> :
      (route==='signIn'
        ?
        <SignIn onRouteChange={this.onRouteChange} /> 
        : 
      <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl} />
           </div>)
  }

    </div>
        );
    }
}
export default App;