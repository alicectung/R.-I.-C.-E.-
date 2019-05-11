import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

const classifier = knnClassifier.create();
const webcamElement = document.getElementById('webcam');
let net;
const LOCAL_STORAGE_KEY = 'mobilenet_classifiers';

const setupWebcam = () => {
	const webcamElement = document.getElementById('webcam');
	console.log('Setting up webcam...')
	return new Promise((resolve, reject) => {
		const navigatorAny = navigator;
		navigator.getUserMedia = navigator.getUserMedia ||
			navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
			navigatorAny.msGetUserMedia;
		if (navigator.getUserMedia) {
			navigator.getUserMedia({ video: true },
				stream => {
					webcamElement.srcObject = stream;
					webcamElement.addEventListener('loadeddata', () => resolve(), false);
				},
				error => reject());
		} else {
			reject();
		}
	});
}

const loadClassifiersFromLocalStorage = () => {
	const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
	return data ? JSON.parse(data) : [];
}


 
class Intake extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      damaged: 0,
      red: 0,
      green: 0,
      chalky: 0
    };
  }
  //this.setState({ total: this.state.count + 1 })

  componentDidMount() {
    this.app()
}


predictImage = async () => {
  console.log('Predicting...')

  if (classifier.getNumClasses() > 0) {
    // Get the activation from mobilenet from the webcam.
    const webcamElement = document.getElementById('webcam');
    const activation = net.infer(webcamElement, 'conv_preds');
      // console.log('activation is: ', activation)
    // Get the most likely class and confidences from the classifier module.
    const result = await classifier.predictClass(activation);
      console.log('result is: ', result)

      const factor = result.label;
      console.log('factor is: ', factor)

      if (factor == 'Damaged') {
        console.log('factor is damaged!')
        this.setState({
          damaged: this.state.damaged + 1
        }, function () {
            console.log('the damaged total is now: ', this.state.damaged)
        });
        this.props.damagedAction(this.state.damaged)
      }
      if (factor == 'Red') {
        console.log('factor is red!')
        this.setState({
          red: this.state.red + 1
        }, function () {
            console.log('the red total is now: ', this.state.red)
        });
        this.props.redAction(this.state.red)
      }
      if (factor == 'Green') {
        console.log('factor is green!')
        this.setState({
          green: this.state.green + 1
        }, function () {
            console.log('the green total is now: ', this.state.green)
        });
        this.props.greenAction(this.state.green)
      }
      if (factor == 'Chalky') {
        console.log('factor is chalky!')
        this.setState({
          chalky: this.state.chalky + 1
        }, function () {
            console.log('the chalky total is now: ', this.state.chalky)
        });
        this.props.chalkyAction(this.state.chalky)
      }
  
        this.setState({
          total: this.state.total + 1,
      }, function () {
          console.log('the state total is now: ', this.state.total); 
          this.props.totalAction(this.state.total)
      });

  }     
};


app = async () => {


	console.log('Loading mobilenet..');

	// Load the model.
	net = await mobilenet.load();
	console.log('Sucessfully loaded model');

	await setupWebcam();

	const addExampleClassifier = async (dataUrl, classId) => {
		// Create an image tag to restore our image data URL on
		const imageTag = document.createElement('img');
		imageTag.src = dataUrl;
		document.body.appendChild(imageTag);
		// Wait for the image to become available in the DOM
		await tf.nextFrame();
		const activation = net.infer(imageTag, 'conv_preds');
		document.body.removeChild(imageTag);
		classifier.addExample(activation, classId);
	};

	// Load existing classifiers from localstorage
	const storedClassifiers = loadClassifiersFromLocalStorage();
	storedClassifiers.forEach( c => addExampleClassifier(c.imageDataUrl, c.classId));
}


    render() {
      return (
        <div className="container">
        <div className="row">
           
                <div className="card col-sm-12">
                    
                        <div className="card-content">
                            <h4 className="card-title" >
                                <a> INTAKE
                            </a>
                            </h4>
                      
                            <video autoPlay playsInline muted id="webcam" className="center" width="224" height="224"></video>

                            <ul className="card-instruction" id="console">
                                <ul>1. Center rice grain in image frame</ul>
                                <ul>2. Click on "Capture" to analyze image</ul>
                            </ul>
                        </div>
                        <div className="card-read-more ">
                            <button className="btn btn-link btn-block" id="capture" onClick={this.predictImage}> 
                                Capture
                            </button>
          
                        </div>
                </div>
      
            </div>
            </div>
  
      );
    }
  }
  
  export default Intake;