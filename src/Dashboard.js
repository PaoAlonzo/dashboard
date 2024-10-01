import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [activePanel, setActivePanel] = useState('controlPanel');

    return (
        <div className="dashboard">
        {/* Sidebar */}
        <aside className="sidebar">
            <div className="logo">👦🏼 Admin</div>
            <nav>
            <ul>
                <li
                className={activePanel === 'controlPanel' ? 'active' : ''}
                onClick={() => setActivePanel('controlPanel')}
                >
                <span>📊</span> Panel de Control
                </li>
                <li
                className={activePanel === 'climatePanel' ? 'active' : ''}
                onClick={() => setActivePanel('climatePanel')}
                >
                <span>🌡️</span> Panel de Clima
                </li>
                <li
                className={activePanel === 'usersPanel' ? 'active' : ''}
                onClick={() => setActivePanel('usersPanel')}
                >
                <span>👥</span> Panel de Usuarios
                </li>
                <li
                className={activePanel === 'parkingMonitoringPanel' ? 'active' : ''}
                onClick={() => setActivePanel('parkingMonitoringPanel')}
                >
                <span>🚗</span> Panel de Monitoreo de Parqueo
                </li>
            </ul>
            </nav>
            <button className="logout">Cerrar sesión</button>
        </aside>

        {/* Main Content */}
        <div className="main-content">
            <header className="header">
            <input type="text" className="search" placeholder="Buscar" />
            <div className="user">
                <span>Admin</span>
                <img
                src="https://via.placeholder.com/40"
                alt="User Profile"
                className="user-avatar"
                />
            </div>
            </header>

            {/* Conditional Content for Each Panel */}
            <div className="panel-content">
            {activePanel === 'controlPanel' && (
                <div>
                <h2>Panel de Control</h2>
                <p>Bienvenido al Panel de Control. Aquí puedes navegar por los diferentes paneles.</p>
                </div>
            )}
            {activePanel === 'climatePanel' && (
                <div>
                <h2>Panel de Clima</h2>
                <p>Visualización en tiempo real de temperatura y humedad del parqueo.</p>
                {/* Aquí podrías integrar p5.js para la visualización */}
                </div>
            )}
            {activePanel === 'usersPanel' && (
                <div>
                <h2>Panel de Usuarios</h2>
                <p>Listado de todos los usuarios registrados en el sistema.</p>
                {/* Aquí podrías mostrar la tabla de usuarios y sus detalles */}
                </div>
            )}
            {activePanel === 'parkingMonitoringPanel' && (
                <div>
                <h2>Panel de Monitoreo del Parqueo</h2>
                <p>Estadísticas en tiempo real del parqueo.</p>
                {/* Aquí podrías mostrar las estadísticas del parqueo */}
                </div>
            )}
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
