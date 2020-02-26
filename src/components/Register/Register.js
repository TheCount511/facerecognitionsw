import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            errorDisplay:'none',
            errorMessage:''
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }
    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch(' https://infinite-island-72586.herokuapp.com/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                })
            }).then(response => response.json())
            .then(user => {
                if (user.id) {  
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                }else{
                  this.setState({
                    errorDisplay: 'block',
                    errorMessage:user
                  })
                }
            })
    }
    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-70-m w-33-l mw6 shadow-5 center">
      <main className="pa4 black-80">
    <form className="measure light-yellow">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f2 fw8 ph0 mh0">Sign Up</legend>
        <div className="mt3">
          <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
          <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--light-yellow" 
          type="email" 
          name="email-address"  
          id="email-address"
          onChange={this.onEmailChange} required/>
        </div>
        <div className="mt3">
          <label className="db fw8 lh-copy f8" htmlFor="name">Name</label>
          <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--light-yellow" 
          type="text" 
          name="name"  
          id="name"
          onChange={this.onNameChange} required/>
        </div>
        
        <div className="mv3">
          <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
          <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--light-yellow" 
          type="password" 
          name="password" 
          id="password"
          onChange={this.onPasswordChange} required/>
        </div>
        <p style={{display: this.state.errorDisplay}}>{this.state.errorMessage}</p>
      </fieldset>
       <div className="">
        <input className="db ph3 pv2 input-reset ba b--light-yellow light-yellow hover-yellow bg-transparent grow pointer f8 dib" 
        type="button"
        onClick={this.onSubmitSignIn}
         value="Sign up"/>
      </div>
        </form>
  </main>
  </article>
        );
    }
}

export default Register;