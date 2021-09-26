import Login from "./login";
import Register from "./register";
import PropTypes from "prop-types";
import React from "react";
import "./Auth.scss"

const RightSide = props => {
  return (
      <div
          className="right-side"
          ref={props.containerRef}
          onClick={props.onClick}
      >
        <div className="inner-container">
          <div className="text">{props.current}</div>
        </div>
      </div>
  );
};

class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoginActive: true
    };
  }

  componentDidMount() {
    this.rightSide.classList.add("right");
  }

  moveToLogin() {
    this.rightSide.classList.remove("left");
    this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLoginActive } = this.state;

    if (isLoginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }

    this.setState(prevState => ({ isLoginActive: !prevState.isLoginActive }));
  }

  render() {
    const { isLoginActive } = this.state;
    const current = isLoginActive? "Register" : "Login";
    const currentActive = isLoginActive ? "login" : "register";
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLoginActive && (
              <Login containerRef={ref => (this.current = ref)}  setToken={this.props.setToken} setUserid={this.props.setUserid}/>
            )}
            {!isLoginActive && (
              <Register containerRef={ref => (this.current = ref)} changeState={this.changeState.bind(this)}/>
            )}
          </div>
          <RightSide current={current}
          currentActive={currentActive}
          containerRef={ref => (this.rightSide = ref)}
          onClick={this.changeState.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default Auth;

Auth.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUserid: PropTypes.func.isRequired
}