import React from 'react';
import {View} from 'react-native';
import {VictoryPie} from 'victory-native';

const DynamicPieChart = ({data}) => {
  return (
    <View>
      <VictoryPie
      
        height={250}
        data={data}
        colorScale="cool"
        animate={{duration: 500}}
        labelPlacement='vertical'
        labels={({ datum }) => `y: ${datum.y}`}
        style={{
          labels: {
            fontSize: 10, // Adjust the font size as needed
          },
        }}
      />
    </View>
  );
};

export default DynamicPieChart;
