import React from "react";
import { getRequest, postRequest } from "../../utils/server";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Tooltip,
  message,
  Button,
  Select,
  Statistic
} from "antd";
import "./index.scss";
import AddMo from "./addModal";
import Charts from "./charts";
const EditableContext = React.createContext();
const { Option } = Select;
const inputStyle = {
  minWidth: "150px"
};
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
const typesNameObj = {
  kitchen: "厨房用具",
  parlor: "客厅用具",
  bathroom: "卫生间用具",
  livingRoom: "卧室用具",
  other: "其他"
};

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber style={inputStyle} />;
    }
    return <Input style={inputStyle} />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: "",
      shoppingData: [],
      showAdd: false,
      totals: [],
      show: false
    };
    this.columns = [
      {
        title: "类型",
        dataIndex: "typeName",
        editable: true,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "编码",
        dataIndex: "projectCode",
        editable: true,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "名称",
        dataIndex: "projectName",
        editable: true,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "品牌",
        dataIndex: "brandName",
        editable: true,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "规格型号",
        dataIndex: "specification",
        editable: true,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            <span className="lineView">{text}</span>
          </Tooltip>
        )
      },
      {
        title: "采购地",
        dataIndex: "from",
        editable: true,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "采购时间",
        dataIndex: "purchaseDate",
        editable: true,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "下定时间",
        dataIndex: "preordainDate",
        editable: true,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "原价",
        dataIndex: "price",
        editable: true,
        align: "right",
        width: 120,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "定金",
        dataIndex: "preordainPrice",
        editable: true,
        align: "right",
        width: 120,
        render: text => <span className="lineView">{text}</span>
      },

      {
        title: "实际支付",
        dataIndex: "actualPay",
        editable: true,
        align: "right",
        width: 120,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "是否配送",
        dataIndex: "isDelivery",
        editable: true,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "配送时间",
        dataIndex: "deliveryDate",
        editable: true,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "收否收货",
        dataIndex: "isReceipt",
        editable: true,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "收货时间",
        dataIndex: "receiptDate",
        editable: true,
        render: text => <span className="lineView">{text}</span>
      },
      {
        title: "配送备注",
        dataIndex: "deliveryRemark",
        editable: true,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            <span className="lineView">{text}</span>
          </Tooltip>
        )
      },
      {
        title: "备注",
        dataIndex: "remark",
        editable: true,
        render: text => (
          <Tooltip placement="topLeft" title={text}>
            <span className="lineView">{text}</span>
          </Tooltip>
        )
      },
      {
        title: "operation",
        dataIndex: "operation",
        fixed: "right",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a
              disabled={editingKey !== ""}
              onClick={() => this.edit(record.key)}
            >
              Edit
            </a>
          );
        }
      }
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields((error, values) => {
      if (error) {
        return;
      }
      console.log("values", values);
      postRequest("/shopping/save", values).then(res => {
        if (res.code === 0) {
          this.columns.map(item => {
            item.editable = false;
          });
          this.cancel();
          message.success("修改成功");
          this.getList();
        }
      });
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }
  setShoppingData = data => {
    this.setState({
      shoppingData: data
    });
  };
  getList = () => {
    getRequest("/shopping/list", {}).then(res => {
      if (res.code === 0) {
        let data = [];
        for (let item of res.result.data) {
          let obj = { ...item, ...item.deliveryDatas, key: item.projectCode };
          data.push(obj);
        }
        let totals = [],
          totalPrice = "";
        for (let item in res.result.totalPrice) {
          if (item !== "total") {
            let val = "";
            switch (item) {
              case "bathroom":
                val = "卫生间用具";
                break;
              case "kitchen":
                val = "厨房用具";
                break;
              case "livingRoom":
                val = "卧室用具";
                break;
              case "other":
                val = "其他";
                break;
              case "parlor":
                val = "客厅用具";
                break;
              default:
                break;
            }
            let obj = {
              name: val,
              value: res.result.totalPrice[item]
            };
            totals.push(obj);
          } else {
            totalPrice = res.result.totalPrice[item];
          }
        }
        this.setShoppingData(data);
        console.log(11111, totals, totalPrice);
        this.setState({
          totals,
          totalPrice,
          totalObj: res.result.totalPrice
        });
      }
    });
  };
  addView = bool => {
    this.setState({
      showAdd: bool
    });
  };
  componentDidMount() {
    this.getList();
  }
  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      // if (!col.editable) {
      //   return col;
      // }
      if (col.dataIndex === "operation") {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });
    return (
      <div>
        <input
          ref={el => (this.myInput = el)}
          type={this.state.show ? "text" : "password"}
          style={{ width: "200px", height: "30px", border: "1px solid" }}
        />
        <button
          onClick={() => {
            this.setState({ show: !this.state.show });
            this.myInput.focus();
          }}
        >
          show/hide
        </button>
        <Button onClick={() => this.addView(true)} style={{ display: "block" }}>
          添加
        </Button>
        <div className="statistic">
          <Statistic title={"总开销"} value={this.state.totalPrice} />
        </div>
        {this.state.totals.map(i => {
          let title = i.name;
          return (
            <div className="statistic">
              <Statistic title={title} value={i.value} />
            </div>
          );
        })}
        <Charts
          totals={this.state.totals}
          totalPrice={this.state.totalPrice}
          totalObj={this.state.totalObj}
        />
        <EditableContext.Provider value={this.props.form}>
          <Table
            components={components}
            bordered
            dataSource={this.state.shoppingData}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              onChange: this.cancel
            }}
            scroll={{ x: "auto" }}
          />
        </EditableContext.Provider>
        <AddMo
          addView={this.addView}
          showAdd={this.state.showAdd}
          getList={this.getList}
        />
      </div>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;
