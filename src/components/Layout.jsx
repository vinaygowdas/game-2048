import React from 'react';

const Layout = ({ children, gridSize }) => {
    return (
        <div className={`main-container ${gridSize === 4 ? 'four' : 'eight'}`}>
            {children}
        </div>
    );
}

export default Layout;
