import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

const LOCAL_STORAGE_KEY = 'mobilenet_classifiers';

class Intake extends Component {


    componentDidMount() {
        this.setupWebcam()
        this.loadClassifiersFromLocalStorage()
      }
 

    setupWebcam() {
        const webcamElement = document.getElementById('webcam');
        console.log('Setting up webcam...')
        return new Promise((resolve, reject) => {
            const navigatorAny = navigator;
            navigator.getUserMedia = navigator.getUserMedia ||
                navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
                navigatorAny.msGetUserMedia;
            // Assign the stream to the desired object 
            if (navigator.getUserMedia) {
              navigator.getUserMedia({video: true},
                stream => {
                  webcamElement.srcObject = stream;
                  webcamElement.addEventListener('loadeddata',  () => resolve(), false);
                },
                error => reject());
            } else {
              reject();
            }
          });
    }

    loadClassifiersFromLocalStorage() {
      // const LOCAL_STORAGE_KEY = 'mobilenet_classifiers';
      const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];   
    }

  
    addExampleClassifier = async (dataUrl, classId) => {
      // Create an image tag to restore our image data URL on
      const imageTag = document.createElement('img');
      imageTag.src = dataUrl;
      document.body.appendChild(imageTag);
      // Wait for the image to become available in the DOM
      await tf.nextFrame();
      const net = mobilenet.load();
      const activation = net.infer(imageTag, 'conv_preds');
      document.body.removeChild(imageTag);
      const classifier = knnClassifier.create();
      classifier.addExample(activation, classId);
      console.log('activation: ', activation)
    }


    // MAIN function to run prediction
    intakePredict = () => {
      console.log('Capture clicked!')

      console.log('Loading mobilenet..');

      // // Load the models
      const net = mobilenet.load();
      console.log('Sucessfully loaded model');

  
      // // Load existing classifiers from localstorage
      const classifier = knnClassifier.create();

        const storedClassifiers = this.loadClassifiersFromLocalStorage();
        storedClassifiers.forEach(async c => await this.addExampleClassifier(c.imageDataUrl, c.classId));

      // Run inference on captured image
      // const predictImage = async ()=> {
          console.log('Predicting...')

          if (classifier.getNumClasses() > 0) {
            // Get the activation from mobilenet from the webcam.
            const webcamElement = document.getElementById('webcam');
            const activation = net.infer(webcamElement, 'conv_preds');
            // Get the most likely class and confidences from the classifier module.
            const result = classifier.predictClass(activation);
         
            console.log(`Class: ', ${result.label}`)
          //   document.getElementById('console').innerText = `
          //   prediction: ${result.label}\n
          //   probability: ${result.confidences[result.label]}
          // `;
          }     
        // };
        // predictImage()

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
                            <a href="" onClick={this.intakePredict} className="btn btn-link btn-block"> 
                                Capture
                            </a>
          
                        </div>
                </div>
      
            </div>
            </div>


     
      );
    }
  }
  
  export default Intake;