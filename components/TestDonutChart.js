import React from 'react';
import {View, Text} from 'react-native';
import {PieChart} from 'react-native-svg-charts';

const TestDonutChart = ({data}) => {
  const pieData = data.map((item, index) => ({
    value: item.value,
    label: item.label,
    count: item.count,
    key: `pie-${index}`,
    svg: {fill: item.color},
    arc: {outerRadius: '70%', padAngle: 0.04},
  }));
  console.log(data, 'dataaaaaaaaaa');

  return (
    <View style={{flexDirection: 'row',backgroundColor:'#fff'}}>
      <View style={{flex: 0.6}}>
        <PieChart style={{height: 200}} data={pieData} />
      </View>
      <View
        style={{flex: 0.5, alignItems: 'flex-start', justifyContent: 'center'}}>
        {data.map((item, index) => (
          <View
            key={`label-${index}`}
            style={{flexDirection: 'row', marginVertical: 5}}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: item.color,
                marginRight: 10,
                marginTop: 5,
                borderRadius: 5,
              }}
            />
            <Text style={{fontSize: 12, color: '#000', fontWeight: 'bold'}}>
              {item.label} :
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#000',
                fontWeight: 'bold',
                marginLeft: 3,
              }}>
              {item.count}
            </Text>
            <Text
              style={{
                marginLeft: 5,
                color: '#000',
              }}>{`(${item.value}%)`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default TestDonutChart;
