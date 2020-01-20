import React, {useEffect, useState} from 'react';
import { Descriptions, Badge } from "antd";
import { getRequest } from "../../utils/server";

const HousePage = ({}) => {
    let [houseData, setHouseData] = useState({ areaDetail:{}});
    useEffect(()=> {
        getRequest("/house/list", {}).then(res => {
          console.log(res);
          if (res.code === 0) {
            setHouseData(res.result[0]);
          }
        });
    }, [])
    return (
      <Descriptions title="House Info">
        <Descriptions.Item label="房屋名称">
          {houseData.houseName}
        </Descriptions.Item>
        <Descriptions.Item label="交房日期">
          {houseData.houseDate}
        </Descriptions.Item>
        <Descriptions.Item label="房屋地址" span={3}>
          {houseData.houseAddress}
        </Descriptions.Item>
        <Descriptions.Item label="备注" span={3}>
          {houseData.remark}
        </Descriptions.Item>
        <Descriptions.Item label="建筑面积">
          {houseData.constructionArea}
        </Descriptions.Item>
        <Descriptions.Item label="实际面积" span={2}>
          {houseData.actualArea}
        </Descriptions.Item>
        <Descriptions.Item label="" span={3}>
          面积详情
        </Descriptions.Item>
        <Descriptions.Item label="客厅">
          {houseData.areaDetail.parlor}
        </Descriptions.Item>
        <Descriptions.Item label="主卧">
          {houseData.areaDetail.livingRoom}
        </Descriptions.Item>
        <Descriptions.Item label="主卧(无飘窗)">
          {houseData.areaDetail.livingRoomNoWindowill}
        </Descriptions.Item>
        <Descriptions.Item label="次卧">
          {houseData.areaDetail.guestRoom}
        </Descriptions.Item>
        <Descriptions.Item label="书房">
          {houseData.areaDetail.study}
        </Descriptions.Item>
      </Descriptions>
    );
}

export default HousePage;