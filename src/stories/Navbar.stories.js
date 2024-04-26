// .storybook/Navbar.stories.js
import React from 'react';
import { MemoryRouter } from 'react-router';
import { SelectedOptionContext } from '../App';
import Navbar from '../components/Navbar';

export default {
  title: 'Components/Navbar',
  component: Navbar,
  decorators: [(Story) => <MemoryRouter initialEntries={['/']}><Story /></MemoryRouter>],
};

const Template = (args) => (
  <SelectedOptionContext.Provider value={{ selectedOption: { value: 'live' }, setSelectedOption: () => {} }}>
    <Navbar {...args} />
  </SelectedOptionContext.Provider>
);

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: 'live', label: 'Live' },
    { value: 5, label: 'Last 5 minutes' },
    { value: 10, label: 'Last 10 minutes' },
    { value: 15, label: 'Last 15 minutes' },
  ],
};