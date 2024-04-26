import React from 'react';
import CpuGraph from '../NetworkUsage';
import ColoredBox from '../Box';

const NetworkCard = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', backgroundColor: 'white', padding: '10px', borderRadius: '15px', width: '700px', border: '1px solid #417db5'}}>
            <h1 style={{color: '#59739e', fontWeight:'bold'}}>Network Usage</h1>
            <CpuGraph/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ColoredBox thiscolor='green' word='Limits'/>
                <ColoredBox thiscolor='blue' word='Requested'/>
                <ColoredBox thiscolor='red' word='Used'/>
            </div>
        </div>
    )
}

export default NetworkCard;