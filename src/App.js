import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Intake from './intake';
import Report from './report';
import Train from './train';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './rice_logo';

function App() {


    return ( 

    
      <BrowserRouter>
          <Switch>

              <Route path="/" render={() => 

                  <div className="container">
                    <div className="nav navbar-nav">

                        <div>
                          <img className="logo-navbar-middle" src={Logo} width={200} alt="RICE logo" />
                        </div>
          
                        <div className="row">
                            <div className="col-sm-6">
                              <Intake />
                            </div>
                            <div className="col-sm-6">
                              <Report />
                            </div>
                        </div>

                    </div>
                  </div>
                 
              }/>

              <Route path="/train" render={() => <Train />} />

          </Switch>
      </BrowserRouter>

      // <div className="container">
      //     <div className="nav navbar-nav">
      //         <div><img className="logo-navbar-middle" src={Logo} width={200} alt="RICE logo" /></div>
      //     </div>

      //   <div className="row">
      //       <div className="col-sm-6">
      //         <Intake />
      //       </div>
      //       <div className="col-sm-6">
      //         <Report />
      //       </div>
      //   </div>
      // </div>

    );
  
}

export default App;
