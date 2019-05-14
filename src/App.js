import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Intake from './intake';
import Analysis from './analysis';
import Report from './report';
import Example from './report';
import {Link} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './rice_logo';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      damaged: 0,
      damagedPercentage: 0,
      red: 0,
      redPercentage: 0,
      green: 0,
      greenPercentage: 0,
      chalky: 0,
      chalkyPercentage: 0
    };
    
    this.damagedHandler = this.damagedHandler.bind(this)
    this.redHandler = this.redHandler.bind(this)
    this.greenHandler = this.greenHandler.bind(this)
    this.chalkyHandler = this.chalkyHandler.bind(this)
    this.totalHandler = this.totalHandler.bind(this)
    
  }


  damagedHandler(damagedFromChild) {

    this.setState({
        damaged: damagedFromChild,
        damagedPercentage: ((damagedFromChild/this.state.total)*100).toFixed(1)
    },() => console.log('Updated Parent State:', this.state));
  }
  redHandler(redFromChild) {
 
    this.setState({
        red: redFromChild,
        redPercentage: ((redFromChild/this.state.total)*100).toFixed(1)
    },() => console.log('Updated Parent State:', this.state));
  }
  greenHandler(greenFromChild) {

    this.setState({
        green: greenFromChild,
        greenPercentage: ((greenFromChild/this.state.total)*100).toFixed(1)
    },() => console.log('Updated Parent State:', this.state));
  }
  chalkyHandler(chalkyFromChild) {

    this.setState({
        chalky: chalkyFromChild,
        chalkyPercentage: ((chalkyFromChild/this.state.total)*100).toFixed(1)
    },() => console.log('Updated Parent State:', this.state));
  }
  totalHandler(totalFromChild){
  
    this.setState({
        total: totalFromChild,
        damagedPercentage: ((this.state.damaged/this.state.total)*100).toFixed(1),
        redPercentage: ((this.state.red/this.state.total)*100).toFixed(1),
        greenPercentage: ((this.state.green/this.state.total)*100).toFixed(1),
        chalkyPercentage: ((this.state.chalky/this.state.total)*100).toFixed(1)
    },() => console.log('Updated Parent State:', this.state),      
    );
  }


  render() {
    return (
      <BrowserRouter>
      <Switch>

          <Route exact path="/" render={() => 

              <div className="container">
                <div className="nav navbar-nav">

                    <div className="logo">
                      <a href=""><img className="logo-navbar-middle" src={Logo} width={200} alt="RICE logo" /></a>
                    </div>
      
                    <div className="row">
                        <div className="col-sm-6">
                          <Intake 
                            totalAction={this.totalHandler}
                            damagedAction={this.damagedHandler}
                            redAction={this.redHandler}
                            greenAction={this.greenHandler}
                            chalkyAction={this.chalkyHandler}
                          />
                        </div>
                        <div className="col-sm-6">
                          <Analysis {...this.state}/>
                   
                        </div>
                    </div>
                    <footer className="footer">rice image classification evaluator</footer>
                </div>
              </div>
             
          }/>

          <Route exact path="/report" render={() => 
              
              <div className="container">
                <div className="nav navbar-nav">

                    <div className="logo">
                    <a href="/"><img className="logo-navbar-middle" src={Logo} width={200} alt="RICE logo" /></a>
                    </div>
              
                    <Report {...this.state}
                      evaluatedBy={this.props.evaluatedBy}
                    />

                </div>
              </div>
          }/>

      </Switch>
  </BrowserRouter>
    )
  }
}
export default App;
