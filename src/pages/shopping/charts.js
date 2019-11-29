import React from "react";
import ReactEcharts from "echarts-for-react";

const ChartsPage = ({ totals, totalPirce = 0, totalObj = {} }) => {
  console.log("totalObj", totalObj, `厨房用具 ${totalObj["kitchen"]}元`);
  const getOption = () => {
    return {
      title: {
        text: "采购开销",
        subtext: `${totalPirce}元`,
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["厨房用具","客厅用具","卫生间用具","卧室用具","其他"]
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: totals,
          label: {
            normal: {
              position: "outer",
              show: true,
               // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                  // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                  // {a}指series.name  {b}指series.data的name
                  // {c}指series.data的value  {d}%指这一部分占总数的百分比
              formatter: "{a} {c}元 {d}%"
            }
          },
          // 设置值域的那指向线
          labelLine: {
            normal: {
              show: true // show设置线是否显示，默认为true，可选值：true ¦ false
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  };

  return (
    <ReactEcharts
      option={getOption()}
      notMerge={true}
      lazyUpdate={true}
      onEvents={() => {}}
      style={{ width: "100%", height: "400px" }}
    />
  );
};
export default ChartsPage;
