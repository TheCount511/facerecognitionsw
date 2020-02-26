import React from 'react'
import Loader from 'react-loader-spinner'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errorView: "none",
            errorMessage:'',
            loader: 'none'
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        this.setState({
            loader: 'block',
            errorView: 'none'
        })
        fetch(' https://infinite-island-72586.herokuapp.com/signin', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            }).then(response => response.json())
            .then(user => {

                if (user.id) {
                    this.setState({
                      loader:'block'
                    })

                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    this.setState({
                        loader: 'none',
                        errorView: 'block',
                        errorMessage: user
                    })
                }
            })
    }
    render() {
        const { onRouteChange } = this.props;

        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-70-m w-33-l mw6 shadow-5 center">
       <main className="pa4 black-80">
     <form className="measure light-yellow">
       <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
         <legend className="f2 fw8 ph0 mh0">Sign In</legend>
         <div className="mt3">
           <label className="db fw8 lh-copy f8" htmlFor="email-address" >Email</label>
           <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--light-yellow" type="email" name="email-address"  id="email-address"
           onChange={this.onEmailChange} required/>
         </div>
         <div className="mv3">
           <label className="db fw8 lh-copy f8" htmlFor="password" >Password</label>
           <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--light-yellow" type="password" name="password"  id="password"
           onChange={this.onPasswordChange} required/>
         </div>
          <div className="mv3">
           <Loader
           style={{display:this.state.loader}}
         type="Puff"
         color="#FBF1A9"
         height={30}
         width={30}
         timeout={5000} //5 secs

      />
           <p className="db fw8 lh-copy f8 yellow" htmlFor="error" style={{display:this.state.errorView}}>{this.state.errorMessage}</p>
         </div>
       </fieldset>
       <div className="">
         <input 
         onClick={this.onSubmitSignIn}
         className="db ph3 pv2 input-reset ba b--light-yellow light-yellow hover-yellow bg-transparent grow pointer f8 dib" 
         type="button"
          value="Sign in"/>
       </div>
       <div className="lh-copy mt3">
         <p onClick={()=>onRouteChange('register')} className="f8 link hover-yellow light-yellow db pointer" >Register</p>
       </div>
     </form>
   </main> 
   </article>);
    }
}
export default SignIn;