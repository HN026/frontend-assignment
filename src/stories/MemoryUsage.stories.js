import React from 'react';
import { SelectedOptionContext } from '../App.js';
import MemoryGraph from '../components/MemoryUsage.js';
import { MimicMetrics } from '../components/api-mimic';

const mockMetrics = [
    {
        name: 'Memory Usage',
        graphLines: [
            {
                name: 'Limits',
                values: [{ timestamp: Date.now(), value: 10 }],
            },
            {
                name: 'Requested',
                values: [{ timestamp: Date.now(), value: 20 }],
            },
            {
                name: 'Used',
                values: [{ timestamp: Date.now(), value: 30 }],
            },
        ],
    },
];

const originalFetchMetrics = MimicMetrics.fetchMetrics;
MimicMetrics.fetchMetrics = () => Promise.resolve(mockMetrics);

export default {
    title: 'Components/MemoryGraph',
    component: MemoryGraph,
};

const Template = (args) => (
    <SelectedOptionContext.Provider value={{ selectedOption: { value: args.value } }}>
        <MemoryGraph />
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

export const Thirty = Template.bind({});
Thirty.args = {
    value: 30,
};

MimicMetrics.fetchMetrics = originalFetchMetrics;