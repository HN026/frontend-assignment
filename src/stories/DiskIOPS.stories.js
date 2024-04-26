import React from 'react';
import { SelectedOptionContext } from '../App.js';
import DiskIopsGraph from '../components/DiskIOPS.js';
import { MimicMetrics } from '../components/api-mimic';

const mockMetrics = [
  {
    name: 'Disk IOPS',
    graphLines: [
      {
        name: 'Read',
        values: [{ timestamp: Date.now(), value: 10 }],
      },
      {
        name: 'Write',
        values: [{ timestamp: Date.now(), value: 20 }],
      },
    ],
  },
];

const originalFetchMetrics = MimicMetrics.fetchMetrics;
MimicMetrics.fetchMetrics = () => Promise.resolve(mockMetrics);

export default {
    title: 'Components/DiskIOPS',
    component: DiskIopsGraph,
};

const Template = (args) => (
  <SelectedOptionContext.Provider value={{ selectedOption: { value: args.value } }}>
    <DiskIopsGraph />
  </SelectedOptionContext.Provider>
);

export const Live = Template.bind({});
Live.args = {
  value: 'live',
};

export const Five = Template.bind({});
Five.args = {
  value: 5,
};

export const Ten = Template.bind({});
Ten.args = {
  value: 10,
};

MimicMetrics.fetchMetrics = originalFetchMetrics;