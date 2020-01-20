import React, { useState } from 'react';
import { postRequest } from "../../utils/server";
import {
  Input,
  InputNumber,
  Form,
  message,
  Modal,
  Select,
  DatePicker,
  Radio
} from "antd";
import moment from "moment";
const { Option } = Select;
const formItemStyle = {
  width: "350px"
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const AddModal = ({ addView, showAdd, getList, form }) => {
  const { getFieldDecorator, validateFields, resetFields } = form;

  const add = () => {
    validateFields((error, values) => {
      if (!error) {
        console.log("values", values);
        for (let i in values) {
          values.preordainDate = values.preordainDate
            ? moment(values.preordainDate).format("YYYY-MM-DD")
            : "";
          values.purchaseDate = values.purchaseDate
            ? moment(values.purchaseDate).format("YYYY-MM-DD")
            : "";
        }
        postRequest("/shopping/add", values).then(res => {
          if (res.code === 0) {
            addView(false);
            message.success("添加成功");
            resetFields();
            getList();
          }
        });
      }
    });
  };

  return (
    <Modal
      title="新增项目"
      width={800}
      visible={showAdd}
      onOk={add}
      onCancel={() => {resetFields(); addView(false);}}
    >
      <Form {...formItemLayout} layout={"inline"}>
        <Form.Item label="类型" style={formItemStyle}>
          {getFieldDecorator("typeCode", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Select>
              <Option value="1">厨房用具</Option>
              <Option value="2">客厅用具</Option>
              <Option value="3">卫生间用具</Option>
              <Option value="4">卧室用具</Option>
              <Option value="5">其他</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="编码" style={formItemStyle}>
          {getFieldDecorator("projectCode", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input placeholder="下定时间或购买时间+当天第几单" />)}
        </Form.Item>
        <Form.Item label="名称" style={formItemStyle}>
          {getFieldDecorator("projectName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="品牌" style={formItemStyle}>
          {getFieldDecorator("brandName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="规格型号" style={formItemStyle}>
          {getFieldDecorator("specification", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="采购地" style={formItemStyle}>
          {getFieldDecorator("from", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="采购时间" style={formItemStyle}>
          {getFieldDecorator("purchaseDate", {
            rules: [{ required: false, message: "Please input your username!" }]
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label="下定时间" style={formItemStyle}>
          {getFieldDecorator("preordainDate", {
            rules: [{ required: false, message: "Please input your username!" }]
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label="原价" style={formItemStyle}>
          {getFieldDecorator("price", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<InputNumber />)}
        </Form.Item>
        <Form.Item label="定金" style={formItemStyle}>
          {getFieldDecorator("preordainPrice", {
            rules: [{ required: false, message: "Please input your username!" }]
          })(<InputNumber />)}
        </Form.Item>
        <Form.Item label="实际支付(包含定金)" style={formItemStyle}>
          {getFieldDecorator("actualPay", {
            rules: [{ required: false, message: "Please input your username!" }]
          })(<InputNumber />)}
        </Form.Item>
        <Form.Item label="是否配送" style={formItemStyle}>
          {getFieldDecorator("isDelivery", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Radio.Group
              options={[
                { label: "y", value: "是" },
                { label: "n", value: "否" }
              ]}
            />
          )}
        </Form.Item>
        <Form.Item label="配送时间" style={formItemStyle}>
          {getFieldDecorator("deliveryDate", {
            rules: [{ required: false, message: "Please input your username!" }]
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label="收否收货" style={formItemStyle}>
          {getFieldDecorator("isReceipt", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Radio.Group
              options={[
                { label: "y", value: "是" },
                { label: "n", value: "否" }
              ]}
            />
          )}
        </Form.Item>
        <Form.Item label="收货时间" style={formItemStyle}>
          {getFieldDecorator("receiptDate", {
            rules: [{ required: false, message: "Please input your username!" }]
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label="配送备注" style={formItemStyle}>
          {getFieldDecorator("deliveryRemark", {
            rules: [{ required: false, message: "Please input your username!" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="备注" style={formItemStyle}>
          {getFieldDecorator("remark", {
            rules: [{ required: false, message: "Please input your username!" }]
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(AddModal);