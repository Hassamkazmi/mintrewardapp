import React, { Fragment, useState } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, DatePicker } from "antd";
import moment from "moment";

export default function ServiceInfo({data}) {
  const onFinishs = (values) => {
    console.log("Received values of form:", data);
  };
  const { RangePicker } = DatePicker;

  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-12">
            <h3>Service Info</h3>
          </div>
        </div>

        <div className="row">
          <div className="row fomik dynamic_form_nest_item">
            <Space
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <div className="row slignc">
                <div className="col-sm-3 forFifty">
                  <Form.Item>
                    <Input
                      placeholder="Tech Name"
                      readOnly
                      value={data?.CompletedServiceRouteAssignmentData?.RouteAssignmentTechnician?.first_name + " " + data?.CompletedServiceRouteAssignmentData?.RouteAssignmentTechnician?.last_name}
                    />
                  </Form.Item>
                </div>

                <div className="col-sm-3 forFifty serviceInfoInput">
                  <Form.Item>
                    <Input value={moment(data?.ServiceDate).format('LL')} readOnly />
                  </Form.Item>
                </div>

                <div className="col-sm-3 forFifty serviceInfoInput">
                  <Form.Item>
                    <Input value={data?.StartTime !== null ? moment(data?.StartTime).format('hh:mm:ss a') : "00:00:00"} readOnly />
                  </Form.Item>
                </div>
                <div className="col-sm-3 forFifty serviceInfoInput">
                  <Form.Item>
                    <Input value={data?.EndTime !== null ? moment(data?.EndTime).format('hh:mm:ss a')  : "00:00:00"} readOnly />
                  </Form.Item>
                </div>
              </div>
            </Space>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
