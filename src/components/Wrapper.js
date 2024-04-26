import React from 'react';

const MaxWidthWrapper = ({ children }) => {
    return (
        <div style={{ maxWidth: '1800px', margin: '0 auto' }}>
            {children}
        </div>
    );
}

export default MaxWidthWrapper;