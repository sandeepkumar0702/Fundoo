import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './DashboardContainer.scss';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

const DashboardContainer = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(prev => !prev);
    };

    return (
        <div className='dashboard-main-body'>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className='dashboard-main-center'>
                <Sidebar isCollapsed={isCollapsed} />
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardContainer;
