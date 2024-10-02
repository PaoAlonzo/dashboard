import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { Bar, Doughnut, PolarArea, Pie } from 'react-chartjs-2';
import ClimateVisualization from './ClimateVisualization';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activePanel, setActivePanel] = useState('controlPanel');
    const [selectedUser, setSelectedUser] = useState(null);
    const [balanceChange, setBalanceChange] = useState(0);
    const [usuarios, setUsuarios] = useState([]); // Initialize as an empty array

    // CLIMA
    const [temperatura, setTemperatura] = useState(0);
    const [humedad, setHumedad] = useState(0);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/obtener_usuarios')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Verifica la estructura de los datos
                if (data.usuarios && Array.isArray(data.usuarios)) { // Verifica si 'data.usuarios' es un arreglo
                    setUsuarios(data.usuarios); // Asigna los usuarios a la variable de estado
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    // CLIMA
    fetch('http://127.0.0.1:8000/obtener_temperatura_humedad')
        .then(response => response.json())
        .then(data => {
            console.log("temperatura y humedad", data.temperatura_humedad)
            if (data.temperatura_humedad) {
                setTemperatura(data.temperatura_humedad.temperatura);
                setHumedad(data.temperatura_humedad.humedad);
                console.log("todo bien")
            } else {
                console.error('Fetched data is not an object:', data);
            }
            // console.log("temperatura configurada", temperatura)
        })
        .catch(error => console.error('Error fetching data:', error));


    const handleLogout = () => {
        navigate('/');
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

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
                                {usuarios.map((user) => (
                                    <div className="cardParqueo" key={user.id} onClick={() => handleUserClick(user)}>
                                        <p>Rol: {user.tipo_usuario}</p>
                                        <h3>Usuario: {user.usuario_id}</h3>
                                        <p>Saldo Disponible: {user.saldo}</p>
                                        <p>Estado: {user.estado}</p>
                                        <p>Último Ingreso: {user.ultimo_ingreso}</p>
                                        <p>Último Egreso: {user.ultimo_egreso}</p>
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
