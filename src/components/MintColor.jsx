import React, { Component } from "react";
import { ethers } from 'ethers';
import Button from 'react-bootstrap/Button';
import { Container, Col, Row, Form } from "react-bootstrap";
import "./styles.css";

// import Npm randomcolor Package
import randomColor from "randomcolor";
let provider;





// import Npm clipboard-copy Package
//import copy from "clipboard-copy";

// some css
function randomWithin (range) {
  let seed;
  if (seed === null) {
    //generate random evenly destinct number from : https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
    var golden_ratio = 0.618033988749895
    var r=Math.random()
    r += golden_ratio
    r %= 1
    return Math.floor(range[0] + r*(range[1] + 1 - range[0]));
  } else {
    //Seeded random algorithm from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    var max = range[1] || 1;
    var min = range[0] || 0;
    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280.0;
    return Math.floor(min + rnd * (max - min));
}
}
/**
 * @param numOfSteps: Total number steps to get color, means total colors
 * @param step: The step number, means the order of the color
 */
 function rainbow(numOfSteps, step) {
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  var r, g, b;
  var h = step / numOfSteps;
  var i = ~~(h * 6);
  var f = h * 6 - i;
  var q = 1 - f;
  switch(i % 6){
      case 0: r = 1; g = f; b = 0; break;
      case 1: r = q; g = 1; b = 0; break;
      case 2: r = 0; g = 1; b = f; break;
      case 3: r = 0; g = q; b = 1; break;
      case 4: r = f; g = 0; b = 1; break;
      case 5: r = 1; g = 0; b = q; break;
  }
  var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
  return (c);
}

async function connectWallet() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  console.log("Hello??");
}

export default class MintColor extends Component {
  constructor(props) {
    super(props);
    // React state
    this.state = {
      bgColor: "",
      bgColor_2: "",
      bgColor_3: "",
      bgColor_4: "",
      display: false
    };
    
    //connectWallet();
    
  }


  randomHsl() { 
    //return `hsla(${Math.random() * 360}, 100%, ${Math.random()*100}%, 1)`
    return `hsla(${Math.random() * 360}, 100%, 60%, 1)`
  }

  // Click function to change a color
  clickColorChangeHandler = (event) => {

    //let color = rainbow(10,2);
    console.log(this.randomHsl());
    this.setState({
      bgColor: this.randomHsl()
    });
    // let color_2 = randomHsl();
    // console.log(color_2);
    // this.setState({
    //   bgColor_3: color_2
    // });
  }

  clickColorChangeHandler_2 = (event) => {
    //let color = randomColor();
    this.setState({
      bgColor_2: this.randomHsl()
    });
  }
    
  clickColorChangeHandler_3 = (event) => {
      //let color = randomColor();
      this.setState({
        bgColor_3: this.randomHsl()
      });
    }   
    
    clickColorChangeHandler_4 = (event) => {
      //let color = randomColor();
      this.setState({
        bgColor_4: this.randomHsl()
      });
    } 
    // color = randomColor();
    // this.setState({
    //   bgColor_4: color
    // });
  

  //  Click Function  Working Only  When Click on Screen
  clickShowHandler = (event) => {
    //copy(this.state.bgColor);

    //  Show Success Full Message On Your Screen
    this.setState({ display: true });
  };

  // clickHideHandler Function Hide Suceess Full Message On Your Screen
  clickHideHandler = (event) => {
    this.setState({ display: false });
  };

  // MouseHover Function Work only Mouse Hovering
  MouseHover = (e) => {
    // call Function Inside Mouse Hover  Event
    let color = randomColor();
    this.setState({
      bgColor: color
    });
    let color_3 = randomColor();
    this.setState({
      bgColor_3: color_3
    });
  };
  MouseHover_2 = (e) => {
    // call Function Inside Mouse Hover  Event
    let color = randomColor();
    this.setState({
      bgColor_2: color
    });
    let color_4 = randomColor();
    this.setState({
      bgColor_4: color_4
    });
  };

  render() {
    return (
      <>
        {/*  Successful Message Show block Inside Your Screen*/}
        <div
          onClick={this.clickHideHandler}
          className="copybox"
          style={{
            display: this.state.display ? "" : "none",
            backgroundColor: "black",
            height: "30px",
            width: "100%"
          }}
        >
          <h5 style={{ color: "white", margin: "auto 0px" }}>
            {" "}
            You Successful Copy Color Code{" "}
          </h5>
          <p style={{ color: "white", cursor: "pointer", margin: "auto 0px" }}>
            {" "}
            Close{" "}
          </p>
        </div>
        {/* Mouse Hover color Change Inside You Screen */}
        <div className="divOuter">
          <div
            onClick={this.clickColorChangeHandler}
            style={{
              backgroundColor: this.state.bgColor
            }}
            //onMouseMove={this.MouseHover}
            className="Box1"
          />
           <div
                       onClick={this.clickColorChangeHandler_2}
            style={{
              backgroundColor: this.state.bgColor_2
            }}
            //onMouseMove={this.MouseHover_2}
            className="Box2"
          />
          <div
            onClick={this.clickColorChangeHandler_3}
            style={{
              backgroundColor: this.state.bgColor_3
            }}
            //onMouseMove={this.MouseHover_3}
            className="Box3"
          />
           <div
            onClick={this.clickColorChangeHandler_4}
            style={{
              backgroundColor: this.state.bgColor_4
            }}
            //onMouseMove={this.MouseHover_3}
            className="Box4"
          />
          
          <Container>
           
          <Row className="mt-5 h-50">
            <Col className="col">
  <Button onClick={this.clickColorChangeHandler_2} size="lg" variant="primary">Mint</Button>
  </Col>
</Row>
</Container>

        </div>
        

      </>
    );
  }
}
