import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register';


const particlesParams = {
    particles: {
        number: {
            value: 90,
            density: { enable: true, value_area: 800 }
        },
    }
}
const initialState = {
    input: '',
    imageUrl: '',
    box: '',
    route: 'signIn',
    isSignedIn: false,
    loader: 'none',
    errorMessage: '',
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}
class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
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

    onPictureSubmit = () => {
        this.setState({ imageUrl: this.state.input, loader: 'block', errorMessage: '' })
        fetch(' https://infinite-island-72586.herokuapp.com/imageurl', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input: this.state.input
                })
            }).then(response => response.json())
            .then(response => {
                if (response.outputs){
                                    if (response.outputs == 'undefined') {
                                        this.setState({
                                            loader: 'none',
                                            errorMessage: response
                                        })
                                    }
                                else {
                                    this.setState({ loader: 'none' })
                                    fetch(' https://infinite-island-72586.herokuapp.com/image', {
                                            method: 'put',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                id: this.state.user.id
                                            })
                                        })
                                        .then(response => response.json())
                                        .then(count => {
                                            this.setState(Object.assign(this.state.user, { entries: count }, ))
                                        }).catch(console.log)
                                }
                            } else {
                    this.setState({
                        loader: 'none',
                        errorMessage: response
                    })
                }
                this.displayBox(this.calculateFaceLocation(response))

            }).catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route === 'signOut') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: route });
    }

    render() {
        const { isSignedIn, route, box, imageUrl, loader, errorMessage } = this.state;

        return (
            <div className="App">
            <Particles className='particles' params={particlesParams} />
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
            {
                route==='home'?
            <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
                <FaceRecognition box={box} imageUrl={imageUrl} loader={loader} errorMessage={errorMessage}/>
           </div>:
           (route==='signIn'|| route==='signOut'?
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
            :   <Register loadUser={this.loadUser}  onRouteChange={this.onRouteChange} /> 
            )
            }
            </div>
        );
    }
}
export default App;