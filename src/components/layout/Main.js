/* Libraries */
import React, { Component } from 'react'
import {Howl} from 'howler'
import Popup from 'reactjs-popup'

/* Components */
import LoginForm from '../ui/LoginForm'
import Footer from './Footer'

/* CSS & Assets */
import '../../css/components/Main.css'
import logo from '../../assets/logo.png'
import hover from '../../assets/sounds/hover.wav'
import popup from '../../assets/sounds/popup.wav'


/* Static JS*/
const soundEffects = [
    new Howl({ // [0]
        src: hover,
        volume: 0.2
    }),
    new Howl({ // [1]
        src: popup,
        volume: 0.1,
        rate : 0.7
    }),
    new Howl({ // [2]
        src: popup,
        volume: 0.1,
        rate : 0.4
    })
]
/* Landing page initiliazing the app "BEGIN JOURNEY" 
   Password checking added only for presentation
   to disable password change isPassword to false 
*/
class Main extends Component {
    constructor(props) {
        super()
        this.state = {
            firstTime: true
        }
    }
    handleUserAction(e) {
        this.setState({firstTime: !(this.state.firstTime)});
    }
    render() {
        return (
            <div className="Main">
                <div className="logo_Container" >
                    <img src={logo} alt="logo" className="logo"/>
                </div>
                <Popup
                    trigger={<div className="button_Container">
                            <button onMouseEnter={ () => soundEffects[0].play()} className="MainButton">
                                Start
                            </button>
                            </div>
                            }
                    onOpen={ () => {soundEffects[1].play(); soundEffects[0].stop()} }
                    onClose= { () => soundEffects[2].play() }
                    modal> 
                    {close => (
                        <div className="MainPopup">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <h1 className="login_Title">{this.state.firstTime ? "Begin" : "Continue"} Your <span className="journey">Journey</span>!</h1>
                            <hr/>
                                <LoginForm firstTime={this.state.firstTime}/>
                            <div className="signin-wrapper">
                                <p>{this.state.firstTime ? "Already started a journey?" : "Your first time here?"} <span onClick={ (event) => this.handleUserAction(event) }>Click here!</span></p>
                            </div>
                        </div>
                    )}
                </Popup>
                <Footer />
            </div>
        )
    }
}


/* exports */
export default Main