import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const CongestionDashboard = (props) => {
  const { users } = props;
  const developers = ['middle_developer', 'senior_developer', 'junior_developer', 'intern'];
  const userCount = users.filter((item) => (developers.includes(item.role))).length;
  const dashData = [
    {
      id: 'Earning',
      value: users.filter((item) => (developers.includes(item.role)) && (item.current_rate > 0)).length,
      color: 'hsl(274, 70%, 50%)',
    },
    {
      id: 'Train/help',
      value: users.filter((item) => (developers.includes(item.role)) && (item.current_rate === '0')).length,
      color: 'hsl(83, 70%, 50%)',
    },
  ];
  return (
    <ResponsivePie
      data={dashData}
      margin={{
        top: 40, right: 160, bottom: 120, left: 0,
      }}
      colors={{ scheme: 'nivo' }}
      borderWidth={2}
      innerRadius={0.5}
      padAngle={1.5}
      cornerRadius={4}
      radialLabel={(d) => `${d.id} (${d.value})`}
      sliceLabel={(d) => `${(d.value / userCount) * 100}%`}
      borderColor={{ from: 'color', modifiers: [['darker', 2]] }}
      radialLabelsSkipAngle={1}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="black"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={30}
      radialLabelsLinkHorizontalLength={30}
      radialLabelsLinkStrokeWidth={5}
      radialLabelsLinkColor={{ from: 'color' }}
      slicesLabelsSkipAngle={10}
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
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'Earning',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'Train/help',
          },
          id: 'dots',
        },
      ]}
    />
  );
};

export default CongestionDashboard;
