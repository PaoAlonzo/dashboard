import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirección
import './Dashboard.css';

import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend ,RadialLinearScale } from 'chart.js';
import { Bar, Doughnut, PolarArea,Pie  } from 'react-chartjs-2'; // Para las estadísticas
import ClimateVisualization from './ClimateVisualization';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
Chart.register(ArcElement, Title, Tooltip, Legend);
Chart.register(ArcElement, Tooltip, Legend,RadialLinearScale );
Chart.register(ArcElement, Tooltip, Legend);



const Dashboard = () => {
    const navigate = useNavigate(); // Inicializar useNavigate
    const [activePanel, setActivePanel] = useState('controlPanel');

    // Manejar la salida
    const handleLogout = () => {
        navigate('/'); // Suponiendo que la ruta '/' es la página de inicio de sesión
    };

    // Datos de la gráfica
    const dataBarras = {
        labels: ['Numero de Lugares Ocupados', 'Numero de Lugares Disponibles'],
        datasets: [
            {
                label: 'Vehiculos Dentro y Fuera del Parqueo',
                data: [20, 90], // Ejemplo: 10 ocupados y 90 disponibles
                backgroundColor: ['rgba(153, 102, 255, 0.6)', '#9BD0F5'],
            },
        ],
    };

    const optionsBarras = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monitoreo de Parqueo',
            },
        },
    };

    const DataAnillo = () => {
        const [data, setData] = useState({
            labels: ['Espacio Ocupado', 'Espacio Disponibles'],
            datasets: [
                {
                    label: '% de ocupacion del Parqueo',
                    data: [10, 90],
                    backgroundColor: ['#36a2eb', '#ffce56'],
                    borderWidth: 1,
                },
            ],
        });
    
        useEffect(() => {
            const interval = setInterval(() => {
                const newOccupied = Math.floor(Math.random() * 100);
                const newAvailable = 100 - newOccupied;
    
                setData({
                    labels: ['Espacio Ocupados', 'Espacio Disponibles'],
                    datasets: [
                        {
                            label: '% de ocupacion del Parqueo',
                            data: [newOccupied, newAvailable],
                            backgroundColor: ['#36a2eb', '#ffce56'],
                        },
                    ],
                });
            }, 1000);
    
            return () => clearInterval(interval);
        }, []);
    
        return <Doughnut data={data} />;
    };
    
    /*const dataAnillo = {
        labels: ['Espacios Ocupados', 'Espacios Disponibles'],
        datasets: [
            {
                label: 'Monitoreo de Parqueo',
                data: [10, 90], // Ejemplo: 10 ocupados y 90 disponibles
                backgroundColor: ['#36a2eb', '#ffce56'],
            },
        ],
    };*/

    /*const optionsAnillo = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Estadísticas del Parqueo',
            },
        },
    };*/

    const dataPolarArea = {
        labels: ['Interno', 'Externo', 'Sin Moneda', 'Con Moneda'],
        datasets: [
            {
                label: 'Porcentaje',
                data: [11, 16, 7, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    //'rgba(153, 102, 255, 0.6)',
                    //'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    //'rgba(153, 102, 255, 1)',
                    //'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const optionsPolarArea = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Gráfico Porcentaje de Usuarios Externos',
            },
        },
    };

    const dataPie = {
        labels: ['Entrado', 'Salido'],
        datasets: [
            {
                label: 'Cantidad',
                data: [12, 19],
                backgroundColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 0.6)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    
    const optionsPie = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Gráfico Cantidad de Ingresos y Egresos en el Dia',
            },
        },
    }

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
                            
                            <ClimateVisualization />
                            
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
                            <div className='panelcardParqueo'>
                                {/* Aquí podrías mostrar las estadísticas del parqueo */}
                                <div className="cardParqueo">
                                    <h2>Panel de Monitoreo Vehiculos Dentro y Fuera del Parqueo</h2>
                                    <Bar data={dataBarras} options={optionsBarras} />
                                </div>

                                <div className="cardParqueo">
                                    <h2>Panel de Monitoreo Porcentaje de ocupacion del Parqueo</h2>
                                    <DataAnillo />
                                </div>

                                <div className="cardParqueo">
                                    <h2>Panel de Monitoreo Porcentaje de Usuarios Externos </h2>
                                    <PolarArea data={dataPolarArea} options={optionsPolarArea} />
                                </div>

                                <div className="cardParqueo">
                                    <h2>Panel de Monitoreo  Ingresos y Egresos durante el Dia</h2>
                                    <Pie data={dataPie} options={optionsPie} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;