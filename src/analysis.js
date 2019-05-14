import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { withRouter } from "react-router-dom";
import {Link} from "react-router-dom";

class Analysis extends Component {


  constructor(props) {
    super(props);
    this.state = {
      evaluatedBy: '',
      grade: ''
      }
    };

      onInputChange = (event) => {
        this.setState({ evaluatedBy: event.target.value });
        
      }

      gradeSelect = (event) => {
        console.log('changing selected..')
        this.setState({ grade: event.target.value });
        console.log("this.state.grade: ", this.state.grade)
      }




      createReport = () => {
        console.log('Creating report...')

        console.log("this.props: ", this.props)

        localStorage.setItem('report', JSON.stringify(this.props));
        localStorage.setItem('evaluatedBy', JSON.stringify(this.state));
      }

    render() {
      return (
        <div className="container">
        <div className="row">
           
                <div className="card col-sm-12">
                    
                        <div className="card-content">
                            <h4 className="card-title" >
                                <a> ANALYSIS</a>
                            </h4>

                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                    <th scope="col">Factors</th>
                                    <th scope="col">Number</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Percentage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="row">Damaged</th>
                                    <td>{this.props.damaged}</td>
                                    <td>{this.props.total}</td>
                                    <td>{this.props.damagedPercentage} %</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Red</th>
                                    <td>{this.props.red}</td>
                                    <td>{this.props.total}</td>
                                    <td>{this.props.redPercentage} %</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Green</th>
                                    <td>{this.props.green}</td>
                                    <td>{this.props.total}</td>
                                    <td>{this.props.greenPercentage} %</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Chalky</th>
                                    <td>{this.props.chalky}</td>
                                    <td>{this.props.total}</td>
                                    <td>{this.props.chalkyPercentage} %</td>
                                
                                    </tr>
                                </tbody>
                            </table>
 
                            <div className="form-group">
                                Select Grade
                                <select className="form-control" onChange={this.gradeSelect}>
                                  <option value="Extra-A" onChange={this.gradeSelect}>Extra A</option>
                                  <option value="A" onChange={this.gradeSelect}>A</option>
                                  <option value="B" onChange={this.gradeSelect}>B</option>
                                  <option value="C" onChange={this.gradeSelect}>C</option>
                                  <option value="Sample" onChange={this.gradeSelect}>Sample</option>
                                </select>
                            </div>
                            <form>
                                <div className="form-group input-sm">
                                <input className="form-control input-sm" 
                                      id="inputsm" type="text" placeholder="Evaluated By" 
                                      value={this.state.evaluatedBy}
                                      onChange={this.onInputChange}
                                      onClick={this.createReport}/>
                                </div>
                            </form>

                            <div className="card-read-more" >
                            <Link onClick={this.createReport} to="/report" className="btn btn-link btn-block">
                                Finish
                            </Link>
                    </div>
                </div>
            </div>

    </div>
    </div>
      );
    }
}


export default Analysis;
