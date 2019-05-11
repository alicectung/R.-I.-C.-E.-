import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Intake from './intake';
import Report from './report';
import Train from './train';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './rice_logo';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      red: 0
    };
    this.redHandler = this.redHandler.bind(this)
    this.totalHandler = this.totalHandler.bind(this)
  }

  redHandler(dataFromChild) {
    // log our state before and after we updated it
    console.log('%cPrevious Parent State: ' + JSON.stringify(this.state), "color:orange");
    this.setState({
        red: dataFromChild
    },() => console.log('Updated Parent State:', this.state));
}
  totalHandler(totalFromChild) {
    // log our state before and after we updated it
    console.log('%cPrevious Parent State: ' + JSON.stringify(this.state), "color:orange");
    this.setState({
        total: totalFromChild
    },() => console.log('Updated Parent State:', this.state));
  }

  render() {
    return (
      <BrowserRouter>
      <Switch>

          <Route exact path="/" render={() => 

              <div className="container">
                <div className="nav navbar-nav">

                    <div>
                      <img className="logo-navbar-middle" src={Logo} width={200} alt="RICE logo" />
                    </div>
      
                    <div className="row">
                        <div className="col-sm-6">
                          <Intake 
                            totalAction={this.totalHandler}
                            redAction={this.redHandler}/>
                        </div>
                        <div className="col-sm-6">
                          <Report {...this.state}/>
                        </div>
                    </div>

                </div>
              </div>
             
          }/>

          {/* <Route exact path="/training" render={() => <Train />} /> */}

      </Switch>
  </BrowserRouter>
    )
  }
}
export default App;
