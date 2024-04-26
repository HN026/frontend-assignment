import React from "react";
import CpuCard from "./cards/CpuCard";
import MemoryCard from "./cards/MemoryCard";
import NetworkCard from "./cards/NetwordCard";
import DiskCard from "./cards/DiskCard";
import { useContext } from 'react';
import { SelectedOptionContext } from '../App.js';

const Metrics = () => {
    const { selectedOption: { value } } = useContext(SelectedOptionContext);
    const isLive = value === 'live' ? true : false;

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()} ${date.toLocaleTimeString()}`;
    };

    return (
        <div style={{ backgroundColor: '#CEE0F8', minHeight: 'calc(100vh - 63px)', padding: '20px', display: 'flex' }}>
            <div style={{ height: "100%", border: '1px solid #417db5', borderRadius: '12px', flex: 1 }}>
                <div style={{ height: '4rem', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'left', paddingLeft: '1.5rem', fontSize: '1.5rem', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottom: '1px solid #417db5' }}>
                    <h1>Metrics</h1>
                    <p style={{ color: '#59739e', backgroundColor: '#fff', fontSize: '14px', marginLeft: '1rem', marginTop: '5px'}}>
                        {isLive ? '' : `${formatTimestamp(new Date(Date.now() - value * 60 * 1000))} -> ${formatTimestamp(new Date())}`}
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '0.5rem', padding: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                        <CpuCard />
                        <MemoryCard />
                    </div>
                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                        <NetworkCard />
                        <DiskCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Metrics;