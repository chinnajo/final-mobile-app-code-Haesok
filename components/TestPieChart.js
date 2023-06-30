import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const TestDonutChart = ({ data }) => {
    const pieData = data.map((item, index) => ({
      value: item.value,
      label: item.label,
      key: `pie-${index}`,
      svg: { fill: item.color },
      arc: { outerRadius: '70%', padAngle: 0,innerRadius:0 },
    }));
  
    return (
      <View style={{ flexDirection: 'row'}}>
        <View style={{ flex: 0.6 }}>
          <PieChart style={{ height: 200 }} data={pieData} />
        </View>
        <View style={{ flex: 0.4, alignItems: 'flex-start' ,justifyContent:'center'}}>
          {data.map((item, index) => (
            <View key={`label-${index}`} style={{ flexDirection: 'row',marginVertical:5 }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: item.color,
                  marginRight: 20,
                  borderRadius: 5,
                }}
              />
              <Text>{item.label}</Text>
              <Text style={{ marginLeft: 10 }}>{`${item.value}%`}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };
  export default TestDonutChart