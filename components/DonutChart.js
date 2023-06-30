import React from 'react';
import {View} from 'react-native';
import {VictoryPie} from 'victory-native';

const DynamicDonutChart = ({data}) => {
  return (
    <View>
      <VictoryPie
        innerRadius={50}
        height={250}
        data={data}
        colorScale="cool"
        animate={{duration: 500}}
        labelPlacement='perpendicular'
        style={{
          labels: {
            fontSize: 10, // Adjust the font size as needed
          },
        }}
      />
    </View>
  );
};

export default DynamicDonutChart;
