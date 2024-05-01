import React, { Fragment } from 'react'
import Noti from "../../assets/img/more.png";
import { Nav, Dropdown } from "react-bootstrap";


export default function GeneralSettingFormTwo()
{
    const array = [1, 2, 3, 4, 5];

    return(
        <Fragment>
            {/* <div className="row fomik customer"> */}
                <div className="row customerInfo generalFiltersResult">
                    <div className='col-sm-6 generalFiltersResultText'>
                        <p>Tech Address (For Route Optimization)</p>
                    </div>
                    <div className='col-sm-6 generalFiltersResultBtn'>
                        <button className='yellowbtn '>Add</button>
                    </div>
                    <div className='col-sm-12'>
                        <div className="routedashboard mainpage customertable gstTable">
                            <div className="ct-chart" id="chartActivity">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Tech Name</th>
                                        <th></th>
                                        <th>Location</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                      {array.map(() => (
                                        <tr>
                                          <td>Dalton Address</td>
                                          <td></td>
                                          <td>990 S 1st Ls Goodyear, A2 85338</td>
                                          <td></td>
                                          <td>
                                            <Dropdown as={Nav.Item} className="notidrop">
                                              <Dropdown.Toggle
                                                data-toggle="dropdown"
                                                id="dropdown-67443507"
                                                variant="default"
                                                className="m-0"
                                              >
                                                <img src={Noti} alt="boximg" />
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu>
                                                <Dropdown.Item>
                                                  Edit
                                                </Dropdown.Item>
                                              
                                                <Dropdown.Item>
                                                  {" "}Delete{" "}
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </td>
                                        </tr>
                                      ))} 
                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
            {/* </div> */}
        </Fragment>
    )
}