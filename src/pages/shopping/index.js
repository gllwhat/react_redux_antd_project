import React, {useEffect, useState} from 'react';
import { Descriptions, Badge } from "antd";
import { getRequest } from "../../utils/server";

const HousePage = ({}) => {
    let [houseData, setHouseData] = useState({});
    useEffect(()=> {
        getRequest("/house", {}).then(res => {
            console.log(res)
            if(res.code === 0) {
                setHouseData(res.result[0]);
            }
        });
    }, [])
    return (
      <h1>shopping</h1>
    );
}

export default HousePage;