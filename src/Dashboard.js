import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import ClimateVisualization from './ClimateVisualization';
import Parqueo from './Parqueo';
import usericon from './imagenes/usericon.png';

const Dashboard = () => {

    const navigate = useNavigate();
    const [activePanel, setActivePanel] = useState('controlPanel');
    const [selectedUser, setSelectedUser] = useState(null);
    const [balanceChange, setBalanceChange] = useState(0);
    const [usuarios, setUsuarios] = useState([]);
    // const [negarBalance, setNegarBalance] = useState(false);


    const [newUserId, setNewUserId] = useState('');
    const [newUserRfid, setNewUserRfid] = useState('');
    const [newUserType, setNewUserType] = useState('');

    const handleRegisterUser = () => {
        if (newUserId && newUserRfid && newUserType) {
            const userData = {
                id: newUserId,
                rfid: newUserRfid,
                tipo_usuario: newUserType
            };

            fetch('http://127.0.0.1:8000/registro_usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(error => {
                            throw new Error(error.detail || 'Error desconocido al registrar el usuario');
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Usuario registrado con éxito:', data);
                    alert('Usuario registrado con éxito!');
                    setNewUserId('');  // Resetea los inputs
                    setNewUserRfid('');
                    setNewUserType('');
                })
                .catch(error => console.error('Error al registrar usuario:', error));
        } else {
            console.error('Todos los campos son obligatorios.');
        }
    };




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



    // Función que maneja el cambio en el input
    const handleBalanceChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value)) {
            const int = parseInt(value);
            setBalanceChange(int); // Guardamos el valor numérico
        }
    };

    const addBalance = () => {
        // setNegarBalance(false); // Cambia a false porque vamos a sumar
        updateBalance(balanceChange); // Llama a la función de actualizar saldo con el valor positivo
    };

    const subtractBalance = () => {
        // setNegarBalance(true); // Cambia a true porque vamos a restar
        updateBalance(-balanceChange); // Llama a la función de actualizar saldo con el valor negativo
    };


    const updateBalance = (amount) => {
        if (selectedUser && amount !== 0) {
            // Usamos el valor que ya viene de balanceChange (positivo o negativo)
            const updatedBalance = selectedUser.saldo + amount;

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
                    console.log('Saldo actualizado con éxito:', data);
                    alert('Saldo actualizado con éxito!');
                    // Actualizamos el saldo localmente
                    setSelectedUser(prev => ({ ...prev, saldo: updatedBalance }));
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
                    <div className="logo"> Administrador</div>
                    <nav>
                        <ul>
                            <li className={activePanel === 'controlPanel' ? 'active' : ''} onClick={() => setActivePanel('controlPanel')}>
                                <span>📊</span> Panel de Administrador
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
                            <div className="userName">
                                <span>Admin</span>
                            </div>
                            <img src={usericon} alt="User Profile" className="user-avatar" />
                        </div>
                    </header>

                    <div className="panel-content">
                        {activePanel === 'usersPanel' && (
                            <div>
                                <h2>Panel de Usuarios</h2>
                                <p>Listado de todos los usuarios registrados en el sistema.</p>

                                <div className="panelcardParqueoD">
                                    {usuarios.map((user) => (
                                        <div className="cardParqueoD" data-saldo={user.saldo} data-tipo_usuario={user.tipo_usuario} key={user.id} onClick={() => handleUserClick(user)}>
                                            <p>Rol: {user.tipo_usuario}</p>
                                            <h3>Usuario: {user.usuario_id}</h3>
                                            <p>Saldo Disponible: {user.saldo > 9999 ? "Ilimitado" : user.saldo}</p>
                                            {/* <p>RFID: {user.rfid}</p> */}
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
                                            <p><strong>Usuario:</strong> {selectedUser.usuario_id}</p>
                                            <p><strong>RFID:</strong> {selectedUser.rfid}</p>
                                            <p><strong>Saldo Disponible:</strong> {Number(selectedUser.saldo) > 9999 ? "Ilimitado" : selectedUser.saldo}</p>
                                            <p><strong>Estado:</strong> {selectedUser.estado}</p>

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
                                                value={balanceChange === 0 ? '' : balanceChange}
                                                onChange={handleBalanceChange}
                                                placeholder="Añadir/Restar saldo"
                                            />
                                            <button onClick={addBalance}>Sumar Saldo</button>
                                            <button onClick={subtractBalance}>Restar Saldo</button>
                                            <button onClick={() => setSelectedUser(null)}>Cerrar</button>

                                        </div>
                                    </div>
                                )}

                            </div>
                        )}

                        {activePanel === 'controlPanel' && (
                            <div className="register-user-form-container">
                                <div className="register-user-form">
                                    <h3>Registrar nuevo usuario</h3>
                                    <label>
                                        ID:
                                        <input
                                            type="text"
                                            value={newUserId}
                                            onChange={(e) => setNewUserId(e.target.value)}
                                            placeholder="Ingrese el ID del usuario"
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        RFID:
                                        <input
                                            type="text"
                                            value={newUserRfid}
                                            onChange={(e) => setNewUserRfid(e.target.value)}
                                            placeholder="Ingrese el RFID del usuario"
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Tipo de Usuario:
                                        <select
                                            value={newUserType}
                                            onChange={(e) => setNewUserType(e.target.value)}
                                        >
                                            <option value="">Seleccione el tipo de usuario</option>
                                            <option value="estudiante">Estudiante</option>
                                            <option value="administrativo">Administrativo</option>
                                        </select>
                                    </label>
                                    <br />
                                    <button onClick={handleRegisterUser}>Registrar Usuario</button>
                                </div>
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
