import React from 'react';
import Sidebar from './SideBar';

const Layout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}

export default Layout
