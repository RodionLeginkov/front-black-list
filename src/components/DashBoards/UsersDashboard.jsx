import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import CongestionDashboard from '../../components/DashBoards/CongestionDashboard';

const UserDashboard = (props) => {
  const { users } = props;
  let count = 0;
  const takeCount = (name) => {
    if (users) {
      count = users.filter((item) => item.role === name).length;
      return count;
    }
  };
  const dashData = [
    {
      id: 'Team Leads',
      value: takeCount('team_leader'),
      label: 'TL',
      color: 'hsl(274, 70%, 50%)',
    },
    {
      id: 'Junior',
      value: takeCount('junior_developer'),
      label: 'Junior',
      color: 'hsl(258, 70%, 50%)',
    },
    {
      id: 'Middle',
      value: takeCount('middle_developer'),
      label: 'Middle',
      color: 'hsl(83, 70%, 50%)',
    },
    {
      id: 'Senior',
      value: takeCount('senior_developer'),
      label: 'Senior',
      color: 'hsl(109, 70%, 50%)',
    },
    {
      id: 'Interns',
      value: takeCount('intern'),
      label: 'Interns',
      color: 'hsl(166, 70%, 50%)',
    },
    {
      id: 'Managers',
      value: takeCount('ceo') + takeCount('cto') + takeCount('sales_manager') + takeCount('office_manager') + takeCount('hr_manager'),
      label: 'Managers',
      color: 'hsl(319, 70%, 50%)',
    },
  ];
  return (
    <>
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
        fontSize={140}
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
              fontSize: 16,
            },
          },
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateY: 56,
            itemWidth: 86,
            itemHeight: 28,
            itemTextColor: 'white',
            symbolSize: 20,
            symbolShape: 'circle',
          },
        ]}
      />
    </>
  );
};

export default UserDashboard;
