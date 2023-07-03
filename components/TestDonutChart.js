import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

const TestDonutChart = ({ data }) => {
    const pieData = data.map((item, index) => ({
      value: item.value,
      label: item.label,
      key: `pie-${index}`,
      svg: { fill: item.color },
      arc: { outerRadius: '70%', padAngle: 0.04 },
    }));
  
    return (
      <View style={{ flexDirection: 'row',alignContent:'space-between' }}>
        <View style={{ flex: 0.6 }}>
          <PieChart style={{ height: 200 }} data={pieData} />
        </View>
        <View style={{ flex: 0.4, alignItems: 'flex-start' ,justifyContent:'center',marginLeft:10}}>
          {data.map((item, index) => (
            <View key={`label-${index}`} style={{ flexDirection: 'row',marginVertical:5 }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: item.color,
                  marginRight: 15,
                  marginTop:5,
                  borderRadius: 5,
                }}
              />
              <Text style={{fontSize:14}}>{item.label}</Text>
              <Text style={{ marginLeft: 10 }}>{`${item.value}%`}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };
  export default TestDonutChart