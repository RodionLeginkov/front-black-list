import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const CongestionDashboard = (props) => {
  const { users } = props;
  let count = 0;
  const takeCount = () => {
    if (users) {
      count = users.filter((item) => (item.role === 'middle_developer' || 'senior_developer' || 'junior_developer' || 'intern') && item.rate > 0).length;
      console.log(count, 'lllllllllll');
      return count;
    }
  };
  const developers = ['middle_developer', 'senior_developer', 'junior_developer', 'intern'];
  const dashData = [
    {
      id: 'Earning',
      value: users.filter((item) => (developers.includes(item.role)) && (item.current_rate > 0)).length,
      label: 'Earning',
      color: 'hsl(274, 70%, 50%)',
    },
    {
      id: 'Train/help',
      value: users.filter((item) => (developers.includes(item.role)) && (item.current_rate === '0')).length,
      label: 'Train/help',
      color: 'hsl(83, 70%, 50%)',
    },
  ];
  return (
    <ResponsivePie
      data={dashData}
      margin={{
        top: 40, right: 20, bottom: 80, left: 80,
      }}
      colors={{ scheme: 'nivo' }}
      borderWidth={4}
      borderColor={{ from: 'color', modifiers: [['darker', 2]] }}
      radialLabelsSkipAngle={1}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="white"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={30}
      radialLabelsLinkHorizontalLength={30}
      radialLabelsLinkStrokeWidth={5}
      radialLabelsLinkColor={{ from: 'color' }}
      slicesLabelsSkipAngle={1}
      slicesLabelsTextColor="#333333"
      isInteractive={false}
      fontSize={230}
      motionStiffness={90}
      motionDamping={15}
      theme={{
        labels: {
          text: {
            fontSize: 24,
          },
        },
        legends: {
          text: {
            fontSize: 19,
          },
        },
      }}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateY: 56,
          itemWidth: 140,
          itemHeight: 28,
          itemTextColor: 'white',
          symbolSize: 20,
          symbolShape: 'circle',
        },
      ]}
    />
  );
};

export default CongestionDashboard;
