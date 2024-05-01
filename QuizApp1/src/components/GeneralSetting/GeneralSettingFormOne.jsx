import React, { Fragment } from "react";
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from "antd";

export default function GeneralSettingFormOne()
{
    return(
        <Fragment>
            <div className="row fomik customer">
                <div className="row customerInfo generalFilters">
                    <p>Sort Customers By</p>
                </div>
                <Form
                    name="General"
                    // form={form}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >
                    <div className="row customerInfo generalFilters">
                        <Radio.Group>
                            <div className="row ">
                                <div className="col-sm-12">
                                    <Radio value="fName">
                                        <p>First Name</p>
                                    </Radio>
                                </div>
                                <div className="col-sm-12 ">
                                    <Radio value="lName">
                                        <p>Last Name</p>
                                    </Radio>
                                </div>

                                <div className="col-sm-12">
                                    <Form.Item name="sendAlerts" label='Send Alerts To (comma-seperated list)'>
                                        <Input placeholder="Send Alerts To (comma-seperated list)"/>
                                    </Form.Item>
                                </div>

                                <div className="col-sm-12 generalFilterSelect">
                                    <div className="col-sm-12">
                                        <Form.Item name="city" label='Current User Time Zone'>
                                            <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: "90%" }}
                                            placeholder="Please select"
                                            // options={options}
                                            />{" "}
                                        </Form.Item>
                                    </div>
                                    <div className="col-sm-12">
                                        <Form.Item name="city" label='Default Minutes Of Route Stop'>
                                            <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: "90%" }}
                                            placeholder="Please select"
                                            // options={options}
                                            />{" "}
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <Form.Item name="compAddress" label='Company Address'>
                                        <Input placeholder="Company Address"/>
                                    </Form.Item>
                                </div>
                                <div className="col-sm-12">
                                    <Form.Item>
                                        <Checkbox value="techEmail">
                                            <p>Show Techs customer email address on the route stop screen</p>
                                        </Checkbox>
                                    </Form.Item>
                                </div>
                                <div className="col-sm-12 ">
                                    <Form.Item>
                                        <Checkbox value="techPhone">
                                            <p>Show Techs customer phone number on the route stop screen</p>
                                        </Checkbox>
                                    </Form.Item>
                                </div>
                            </div>
                        </Radio.Group>
                       
                    </div>
                </Form>
            </div>
        </Fragment>
    )

}