import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import ClimateVisualization from './ClimateVisualization';
import Parqueo from './Parqueo';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activePanel, setActivePanel] = useState('controlPanel');
    const [selectedUser, setSelectedUser] = useState(null);
    const [balanceChange, setBalanceChange] = useState(0);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = () => {
            fetch('http://127.0.0.1:8000/obtener_usuarios')
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched data:', data);
                    if (data.usuarios && Array.isArray(data.usuarios)) {
                        setUsuarios(data.usuarios);
                    } else {
                        console.error('Fetched data is not an array or is undefined:', data);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        };

        fetchUsuarios();
        const intervalId = setInterval(fetchUsuarios, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = () => {
        navigate('/');
    };

    const handleUserClick = (user) => {
        setSelectedUser(null); // Reseteamos el usuario seleccionado mientras cargamos nuevos datos
        fetch(`http://127.0.0.1:8000/obtener_historial_usuario/${user.usuario_id}`)
            .then(response => response.json())
            .then(data => {
                if (data.historial && Array.isArray(data.historial)) {
                    // Toma el rfid del primer registro en el historial, si existe
                    const rfid = data.historial.length > 0 ? data.historial[0].rfid : user.rfid;
                    
                    setSelectedUser({
                        ...user,
                        rfid: rfid, // Incluimos el rfid del historial si está disponible
                        history: data.historial.map((record) => ({
                            entry: record.tipo_movimiento === 'ingreso' ? record.fecha_hora : null,
                            exit: record.tipo_movimiento === 'egreso' ? record.fecha_hora : null,
                        }))
                    });
                } else {
                    console.error('Historial no disponible o datos incorrectos:', data);
                }
            })
            .catch(error => console.error('Error fetching user history:', error));
    };
    
    

    const handleBalanceChange = (e) => {
        setBalanceChange(Number(e.target.value));
    };

    const updateBalance = () => {
        if (selectedUser && balanceChange !== 0) {
            const updatedBalance = selectedUser.saldo + balanceChange; // Calcula el nuevo saldo
    
            fetch(`http://127.0.0.1:8000/modificar_saldo/${selectedUser.usuario_id}/${updatedBalance}`, {
                method: 'PUT', // Método PUT para modificar el saldo
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(error.detail || 'Error desconocido');
                    });
                }
                return response.json();
            })
            .then(data => {
                // Si la respuesta es exitosa
                console.log('Saldo actualizado con éxito:', data);
                setSelectedUser(prev => ({ ...prev, saldo: updatedBalance })); // Actualiza el saldo en el estado local
                setBalanceChange(0); // Resetea el valor del input después de actualizar
            })
            .catch(error => console.error('Error en la solicitud de actualización de saldo:', error));
        } else {
            console.error('No hay usuario seleccionado o no se ha ingresado un cambio de saldo válido.');
        }
    };
    
    
    

    return (
        <div className="fondoDashboard">
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
                                        <div className="cardParqueo" data-saldo={user.saldo} data-tipo_usuario={user.tipo_usuario} key={user.id} onClick={() => handleUserClick(user)}>
                                            <p>Rol: {user.tipo_usuario}</p>
                                            <h3>Usuario: {user.usuario_id}</h3>
                                            <p>RFID: {user.rfid}</p>
                                            <p>Saldo Disponible: {user.saldo > 999 ? "Ilimitado" : user.saldo}</p>
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
            <p><strong>Nombre:</strong> {selectedUser.usuario_id}</p>
            <p><strong>Saldo Disponible:</strong> {selectedUser.saldo}</p>
            <p><strong>Estado:</strong> {selectedUser.estado}</p>
            <p><strong>RFID (del historial):</strong> {selectedUser.rfid}</p>

            <h4>Historial de Ingresos y Egresos</h4>
            <ul>
                {selectedUser.history && selectedUser.history.length > 0 ? (
                    selectedUser.history.map((record, index) => (
                        <li key={index}>
                            {record.entry && <p>Ingreso: {record.entry}</p>}
                            {record.exit && <p>Egreso: {record.exit}</p>}
                        </li>
                    ))
                ) : (
                    <p>No hay historial disponible.</p>
                )}
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
                                <Parqueo />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
