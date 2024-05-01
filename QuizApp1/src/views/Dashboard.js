import React, { useEffect, useState } from "react";

import {  Container, Row, Col} from "react-bootstrap";
import Boxes from "../components/Index/Boxes";
import Graph from "../components/Index/Graph";
import Workorder from "../components/Index/Workorder";
import Routedashboard from "../components/Index/Routedashboard";
import Customers from "../components/Index/Customers";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../../src/routes";
import AdminNav from "../../src/components/Navbars/AdminNavbar"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {fetchgetDashboardApi} from "../redux/Slices/getDashboardData"
import moment from "moment";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: getDashboardApi } = useSelector((state) => state.getDashboardApi);

  useEffect(() => {
    dispatch(fetchgetDashboardApi())

  },[dispatch])

  return (
    <>
    <Sidebar routes={routes}/>
            <div className="main-panel" >
        <AdminNav />
     <div className="content dasssssshhhBoarrddd">


      <Container fluid>
        <Boxes/>
        <Row className="sameheight">
          <Col md="8">
            <Graph/>
          </Col>
          <Col md="4">
            <Workorder data={getDashboardApi?.RecentWorkOrder}/>
          </Col>
        </Row>


        <Row className="sameheight">
          <Col md="8">
            <Routedashboard data={getDashboardApi?.RouteAssignment}/>
          </Col>
          <Col md="4">
            <Customers data={getDashboardApi?.Customers}/>
          </Col>
        </Row>
      </Container>

      </div>
      </div>
    </>
  );
}

export default Dashboard;
