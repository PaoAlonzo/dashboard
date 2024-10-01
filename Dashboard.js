import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirección
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate(); // Inicializar useNavigate
    const [activePanel, setActivePanel] = useState('controlPanel');

    // Manejar la salida
    const handleLogout = () => {
        navigate('/'); // Suponiendo que la ruta '/' es la página de inicio de sesión
    };

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
                <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
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

                            {/* Previsualización de los otros paneles */}
                            <div className="preview-section">
                                <h3>Previsualización de Paneles</h3>
                                <div className="cards-section">
                                    <div className="card">
                                        <h4>Panel de Clima</h4>
                                        <p>Temperatura: 25°C</p>
                                        <p>Humedad: 70%</p>
                                    </div>
                                    <div className="card">
                                        <h4>Panel de Usuarios</h4>
                                        <p>Usuarios registrados: 150</p>
                                    </div>
                                    <div className="card">
                                        <h4>Monitoreo de Parqueo</h4>
                                        <p>Vehículos dentro: 10</p>
                                        <p>Espacios disponibles: 90</p>
                                    </div>
                                </div>
                            </div>
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
