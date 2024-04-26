import React from 'react';
import { SelectedOptionContext } from '../App';
import Logs from '../components/Logs';

export default {
  title: 'Components/Logs',
  component: Logs,
};

const Template = (args) => (
  <SelectedOptionContext.Provider value={{ selectedOption: { value: args.value } }}>
    <Logs />
  </SelectedOptionContext.Provider>
);

export const LiveLogs = Template.bind({});
LiveLogs.args = { value: 'live' };

export const FiveMinutesLogs = Template.bind({});
FiveMinutesLogs.args = { value: 5 };

export const TenMinutesLogs = Template.bind({});
TenMinutesLogs.args = { value: 10 };

export const FifteenMinutesLogs = Template.bind({});
FifteenMinutesLogs.args = { value: 15 };