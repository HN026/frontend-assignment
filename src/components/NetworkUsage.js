import React, { useEffect, useState, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { MimicMetrics } from './api-mimic';
import { SelectedOptionContext } from '../App.js';
import 'chartjs-adapter-date-fns';
import zoomPlugin from 'chartjs-plugin-zoom';

import { Chart, CategoryScale, LinearScale, PointElement, LineElement, TimeScale} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, TimeScale);

const NetworkGraph = () => {
    const [networkData, setNetworkData] = useState(null);
    const { selectedOption: { value } } = useContext(SelectedOptionContext);

    useEffect(() => {
        let intervalId;

        const updateData = async () => {
            const now = Date.now();
            const startTs = value === 'live' ? now - 60 * 60 * 1000 : now - value * 60 * 1000;
            const metrics = await MimicMetrics.fetchMetrics({ startTs, endTs: now });
            const networkGraphData = metrics.find((graph) => graph.name === 'Network Usage');
            setNetworkData(networkGraphData);
        };

        updateData();

        if (value === 'live') {
            intervalId = setInterval(updateData, 1 * 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [value]);

    if (!networkData) {
        return <div>Loading...</div>;
    }

    const lineColors = {
        'Limits': 'green',
        'Requested': 'blue',
        'Used': 'red'
    };

    const data = {
        labels: networkData.graphLines[0].values.map((v) => new Date(v.timestamp)),
        datasets: networkData.graphLines.map((line) => ({
            label: line.name,
            data: line.values.map((v) => v.value),
            fill: false,
            borderColor: lineColors[line.name],
            tension: 0.1,
            pointRadius: 0,
        })),
    };

    const options = {
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                }
            }
        },
        scales: {
            x: {
                type: 'time',
                grid: {
                    color: '#cbdbf5'
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 8
                }
            }
        },
    };

    return <Line data={data} options={options} plugins={[zoomPlugin]} style={{ height: '40px', width: '650px' }} />;
};

export default NetworkGraph;