import React from 'react';
import CpuGraph from '../DiskIOPS';
import ColoredBox from '../Box';

const DiskCard= () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', backgroundColor: 'white', padding: '10px', borderRadius: '15px', width: '700px', border: '1px solid #417db5'}}>
            <h1 style={{color: '#59739e', fontWeight:'bold'}}>Disk IOPS</h1>
            <CpuGraph/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ColoredBox thiscolor='red' word='Read'/>
                <ColoredBox thiscolor='blue' word='Write'/>
            </div>
        </div>
    )
}

export default DiskCard;