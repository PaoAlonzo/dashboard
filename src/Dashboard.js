import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { Bar, Doughnut, PolarArea, Pie } from 'react-chartjs-2';
import ClimateVisualization from './ClimateVisualization';

// Dummy data for users
const users = [
    {
        id: 1,
        name: 'John Doe',
        balance: 100,
        status: 'Dentro',
        lastEntry: '2024-09-20 08:00',
        lastExit: '2024-09-20 17:00',
        role: 'Usuario',
        rfid: 'ABC123',
        history: [
            { entry: '2024-09-20 08:00', exit: '2024-09-20 17:00' },
            { entry: '2024-09-19 09:00', exit: '2024-09-19 18:00' },
        ],
    },
    {
        id: 2,
        name: 'Jane Smith',
        balance: 50,
        status: 'Fuera',
        lastEntry: '2024-09-19 09:30',
        lastExit: '2024-09-19 18:15',
        role: 'Administrador',
        rfid: 'XYZ789',
        history: [
            { entry: '2024-09-19 09:30', exit: '2024-09-19 18:15' },
            { entry: '2024-09-18 08:30', exit: '2024-09-18 17:45' },
        ],
    },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [activePanel, setActivePanel] = useState('controlPanel');
    const [selectedUser, setSelectedUser] = useState(null);
    const [balanceChange, setBalanceChange] = useState(0);

    const handleLogout = () => {
        navigate('/');
    };

    // Function to handle selecting a user
    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    // Function to handle balance change
    const handleBalanceChange = (e) => {
        setBalanceChange(Number(e.target.value));
    };

    const updateBalance = () => {
        if (selectedUser) {
            selectedUser.balance += balanceChange;
            setSelectedUser({ ...selectedUser });
            setBalanceChange(0); // Reset the input after updating
        }
    };

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="logo">👦🏼 Admin</div>
                <nav>
                    <ul>
                        <li className={activePanel === 'controlPanel' ? 'active' : ''} onClick={() => setActivePanel('controlPanel')}>
                            <span>📊</span> Panel de Control
                        </li>
                        <li className={activePanel === 'climatePanel' ? 'active' : ''} onClick={() => setActivePanel('climatePanel')}>
                            <span>🌡️</span> Panel de Clima
                        </li>
                        <li className={activePanel === 'usersPanel' ? 'active' : ''} onClick={() => setActivePanel('usersPanel')}>
                            <span>👥</span> Panel de Usuarios
                        </li>
                        <li className={activePanel === 'parkingMonitoringPanel' ? 'active' : ''} onClick={() => setActivePanel('parkingMonitoringPanel')}>
                            <span>🚗</span> Panel de Monitoreo de Parqueo
                        </li>
                    </ul>
                </nav>
                <button className="logout" onClick={handleLogout}>Cerrar sesión</button>
            </aside>

            <div className="main-content">
                <header className="header">
                    <input type="text" className="search" placeholder="Buscar" />
                    <div className="user">
                        <span>Admin</span>
                        <img src="https://via.placeholder.com/40" alt="User Profile" className="user-avatar" />
                    </div>
                </header>

                <div className="panel-content">
                    {activePanel === 'usersPanel' && (
                        <div>
                            <h2>Panel de Usuarios</h2>
                            <p>Listado de todos los usuarios registrados en el sistema.</p>

                            <div className="panelcardParqueo">
                                {users.map((user) => (
                                    <div className="cardParqueo" key={user.id} onClick={() => handleUserClick(user)}>
                                        <h3>{user.name}</h3>
                                        <p>Saldo Disponible: {user.balance}</p>
                                        <p>Estado: {user.status}</p>
                                        <p>Último Ingreso: {user.lastEntry}</p>
                                        <p>Último Egreso: {user.lastExit}</p>
                                        <p>Rol: {user.role}</p>
                                    </div>
                                ))}
                            </div>

                            {selectedUser && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <h3>Detalles del Usuario</h3>
                                        <p>Nombre: {selectedUser.name}</p>
                                        <p>Saldo Disponible: {selectedUser.balance}</p>
                                        <p>RFID: {selectedUser.rfid}</p>
                                        <h4>Historial de Ingresos y Egresos</h4>
                                        <ul>
                                            {selectedUser.history.map((record, index) => (
                                                <li key={index}>Ingreso: {record.entry}, Egreso: {record.exit}</li>
                                            ))}
                                        </ul>

                                        <h4>Modificar Saldo</h4>
                                        <input
                                            type="number"
                                            value={balanceChange}
                                            onChange={handleBalanceChange}
                                            placeholder="Añadir/Restar saldo"
                                        />
                                        <button onClick={updateBalance}>Actualizar Saldo</button>
                                        <button onClick={() => setSelectedUser(null)}>Cerrar</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Other Panels (Control, Climate, Parking Monitoring) */}
                    {activePanel === 'controlPanel' && (
                        <div>
                            <h2>Panel de Control</h2>
                            <p>Bienvenido al Panel de Control. Aquí puedes navegar por los diferentes paneles.</p>
                        </div>
                    )}

                    {activePanel === 'climatePanel' && (
                        <div>
                            <h2>Panel de Clima</h2>
                            <ClimateVisualization />
                        </div>
                    )}

                    {activePanel === 'parkingMonitoringPanel' && (
                        <div>
                            <h2>Panel de Monitoreo del Parqueo</h2>
                            <p>Estadísticas en tiempo real del parqueo.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;