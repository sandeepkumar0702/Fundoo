import React from 'react';
import '../DashboardContainer/DashboardContainer.scss';
import { Lightbulb, FolderDown, Trash2, Bell } from "lucide-react"; // Added Bell icon
import './Sidebar.scss';
import { NavLink, useLocation } from 'react-router-dom';

const sidebarItemsList = [
    {
        name: "Notes",
        icon: Lightbulb,
        path: '/dashboard/notes'
    },
    {
        name: "Archive",
        icon: FolderDown,
        path: '/dashboard/archive'
    },
    {
        name: "Reminders",
        icon: Bell, // New Reminders item with Bell icon
        path: '/dashboard/reminders'
    },
    {
        name: "Trash",
        icon: Trash2,
        path: '/dashboard/trash'
    },
];

const Sidebar = ({ isCollapsed, onPageChange }) => {
    const location = useLocation();

    const handleNavClick = (itemName) => {
        onPageChange(itemName);
    };

    return (
        <div className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            {sidebarItemsList.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;
                return (
                    <NavLink 
                        to={item.path} 
                        key={index}
                        onClick={() => handleNavClick(item.name)}
                    >
                        <div className={`sidebar-column ${isActive ? "notes" : ""}`}>
                            <IconComponent className='sidebar-icon' />
                            <p className='sidebar-text'>{item.name}</p>
                        </div>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Sidebar;