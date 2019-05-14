import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';

const retrieveLocalStorage = async () => {
  let object = await JSON.parse(localStorage.getItem('evaluatedBy'));
  return object
}

let object = JSON.parse(localStorage.getItem('evaluatedBy'));

class Report extends Component {

  componentDidMount() {
    retrieveLocalStorage();
  }

  constructor(props) {
    super(props);
      this.state = {
          evaluatedBy: object.evaluatedBy,
          grade: object.grade
      };
  }

  



    render() {
      return (
        <div className="container">
        <div className="row">
           
                <div className="card col-sm-12">
                    
                        <div className="card-content">
                            <h4 className="card-title" >
                                <a> REPORT</a>
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
                              <br></br>
                            <div className="grade">
                               <h4>Grade: {this.state.grade}</h4>
                            </div>
                                  <br></br>
                                <div className="grade">
                                <h4>Evaluated By: {this.state.evaluatedBy}</h4>
                                </div>
                        

                                <div className="card-read-more" >
                                    <a href="" className="btn btn-link btn-block">
                                        Print
                                    </a>
                                </div>
                </div>
            </div>

    </div>
    </div>
      );
    }
}

// class Example extends React.Component {
//     render() {
//       return (
//         <div>
//           <Report ref={el => (this.componentRef = el)} />
//           <ReactToPrint
//             trigger={() => <a href="#">Print this out!</a>}
//             content={() => this.componentRef}
//           />
          
//         </div>
//       );
//     }
//   }
  
export default Report;
