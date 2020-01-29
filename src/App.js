import React, {Component} from 'react';
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
                  
                  number:{
                    value:90,
                    density:{enable:true,value_area: 800}},

               
                }
}

class App extends Component
{
constructor(){
  super();
  this.state = {input: '', imageUrl:''}
}

onInputChange = (event)=>{
this.setState({input: event.target.value});
}

onButtonSubmit= () => { 

this.setState({imageUrl:this.state.input})
app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );
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
    <FaceRecognition imageUrl={this.state.imageUrl} />
    </div>
  );
}
}
export default App;
