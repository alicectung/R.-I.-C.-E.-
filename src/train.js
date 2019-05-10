import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

const classifier = knnClassifier.create();
const webcamElement = document.getElementById('webcam');

let net;

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const LOCAL_STORAGE_KEY = 'mobilenet_classifiers';

class Train extends Component {

componentDidMount() {
    this.app()
}

setupWebcam() {
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


loadClassifiersFromLocalStorage() {
	const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
	return data ? JSON.parse(data) : [];
}

saveClassifierToLocalStorage(classifiers, imageDataUrl, classId) {
	classifiers.push({
		imageDataUrl,
		classId
	});
	window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(classifiers));
}

clearLocalStorage() {
	window.localStorage.removeItem(LOCAL_STORAGE_KEY);
	window.location.reload();
}

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

	// Reads an image from the webcam and associates it with a specific class
	// index.
	const addExample = classId => {
		// Get the intermediate activation of MobileNet 'conv_preds' and pass that
		// to the KNN classifier.
		// const activation = net.infer(webcamElement, 'conv_preds');

		// Pass the intermediate activation to the classifier.
		// classifier.addExample(activation, classId);
		ctx.drawImage(webcamElement, 0, 0, canvas.width, canvas.height);
		const dataUrl = canvas.toDataURL();
		addExampleClassifier(dataUrl, classId);
		saveClassifierToLocalStorage(storedClassifiers, dataUrl, classId);
	};

	// When clicking a button, add an example for that class.
	document.getElementById('class-a').addEventListener('click', () => addExample('A'));
	document.getElementById('class-b').addEventListener('click', () => addExample('B'));
	document.getElementById('class-c').addEventListener('click', () => addExample('C'));
	document.getElementById('clear-data').addEventListener('click', () => clearLocalStorage());

	while (true) {
		if (classifier.getNumClasses() > 0) {
			// Get the activation from mobilenet from the webcam.
			const activation = net.infer(webcamElement, 'conv_preds');
			// Get the most likely class and confidences from the classifier module.
			const result = await classifier.predictClass(activation);
			document.getElementById('console').innerText = `
		  prediction: ${result.label}\n
		  probability: ${result.confidences[result.label]}
		`;
		}

		await tf.nextFrame();
	}
}





    render() {
        return (
          <div className="container">
          <div className="row">
             
                  <div className="card col-sm-12">
                      
                          <div className="card-content">
                              <h4 className="card-title" >
                                  <a> TRAIN
                              </a>
                              </h4>
                        
                              <video autoPlay playsInline muted id="webcam" className="center" width="224" height="224"></video>
  
                              <ul className="card-instruction" id="console">
                                  <ul>1. Center rice grain in image frame</ul>
                                  <ul>2. Click on "Capture" to analyze image</ul>
                              </ul>
                          </div>
                          <div className="card-read-more ">
                              <a href="#" onClick={this.intakePredict} className="btn btn-link btn-block"> 
                                  Train
                              </a>
            
                          </div>
                  </div>
        
              </div>
              </div>
  
  
       
        );
      }
    }
    
    export default Train;