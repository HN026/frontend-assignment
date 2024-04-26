import React from 'react';
import MaxWidthWrapper from '../components/Wrapper';

export default {
  title: 'Components/MaxWidthWrapper',
  component: MaxWidthWrapper,
};

const Template = (args) => <MaxWidthWrapper {...args}>Wrapper Content</MaxWidthWrapper>;

export const Default = Template.bind({});