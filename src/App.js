import React, { Component } from "react";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecongnition from "./components/FaceRecongnition/FaceRecongnition";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import "./App.css";

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: false,
        value_area: 200,
      },
    },
    shape: {
      type: "star",
    },
    opacity: {
      random: true,
    },
  },
};

const apiKey = process.env.REACT_APP_API_KEY;
const app = new Clarifai.App({ apiKey: apiKey });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      box: [],
    };
  }
  calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    let box = [];
    for (let i = 0; i < regions.length; i++) {
      const boxValue = regions[i].region_info.bounding_box;
      const image = document.getElementById("inputImage");
      const width = Number(image.width);
      const height = Number(image.height);
      box.push({
        topRow: boxValue.top_row * height,
        leftCol: boxValue.left_col * width,
        bottomRow: height - boxValue.bottom_row * height,
        rightCol: width - boxValue.right_col * width,
      });
    }
    return { box };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box.box });
  };
  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onUpload = (e) => {
    this.setState({ input: e.target.value });
  };
  onSubmitChange = () => {
    app.models
      .initModel({
        id: Clarifai.FACE_DETECT_MODEL,
      })
      .then((generalModel) => {
        return generalModel.predict(this.state.input);
      })
      .then((response) => {
        console.log(response);
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((e) => console.log(e));
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmitChange={this.onSubmitChange}
          onUpload={this.onUpload}
        />
        <FaceRecongnition box={this.state.box} input={this.state.input} />
      </div>
    );
  }
}

export default App;
