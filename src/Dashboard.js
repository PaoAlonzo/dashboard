import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Importar estilos
import p5 from 'p5'; // Para animaciones con p5.js
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2'; // Para las estadísticas

// Registrar los componentes necesarios de Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    // Simulación de datos de clima
    const [temperature, setTemperature] = useState(0);
    const [humidity, setHumidity] = useState(0);

    // Simulación de datos de usuarios
    const [users, setUsers] = useState([
        { name: 'John Doe', balance: 100, status: 'Dentro', role: 'Usuario', lastEntry: '08:00', lastExit: '18:00' },
        // Agregar más usuarios aquí...
    ]);
    const [selectedUser, setSelectedUser] = useState(null);

    // Simulación de datos de monitoreo de parqueo
    const parkingStats = {
        vehiclesInside: 10,
        availableSpaces: 90,
        occupancyRate: 10,
        externalUsersRate: 5,
        dailyEntries: 100,
        dailyExits: 95,
    };

    // Efecto para simular datos de clima
    useEffect(() => {
        const interval = setInterval(() => {
            setTemperature((Math.random() * 10 + 20).toFixed(2)); // Rango 20-30 grados
            setHumidity((Math.random() * 20 + 60).toFixed(2)); // Rango 60-80%
        }, 5000); // Actualiza cada 5 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard-container">
            {/* Panel de Clima */}
            <div className="panel weather-panel">
                <h2>Panel de Clima</h2>
                <p>Temperatura: {temperature}°C</p>
                <p>Humedad: {humidity}%</p>
                {/* Aquí puedes integrar p5.js para animaciones */}
            </div>

            {/* Panel de Usuarios */}
            <div className="panel users-panel">
                <h2>Panel de Usuarios</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={index} onClick={() => setSelectedUser(user)}>
                            {user.name} - {user.status}
                        </li>
                    ))}
                </ul>
                {selectedUser && (
                    <div className="user-details">
                        <h3>Detalles de {selectedUser.name}</h3>
                        <p>Saldo: Q{selectedUser.balance}</p>
                        <p>Último Ingreso: {selectedUser.lastEntry}</p>
                        <p>Último Egreso: {selectedUser.lastExit}</p>
                        <button onClick={() => setSelectedUser(null)}>Cerrar</button>
                    </div>
                )}
            </div>

            {/* Panel de Monitoreo del Parqueo */}
            <div className="panel parking-monitor">
                <h2>Panel de Monitoreo del Parqueo</h2>
                <p>Vehículos dentro: {parkingStats.vehiclesInside}</p>
                <p>Espacios disponibles: {parkingStats.availableSpaces}</p>
                <p>Porcentaje de ocupación: {parkingStats.occupancyRate}%</p>
                <p>Porcentaje de usuarios externos: {parkingStats.externalUsersRate}%</p>
                <p>Vehículos ingresados hoy: {parkingStats.dailyEntries}</p>
                <p>Vehículos salidos hoy: {parkingStats.dailyExits}</p>
                {/* Gráfico de barras para Entradas/Salidas */}
                <Bar
                    data={{
                        labels: ['Entradas', 'Salidas'],
                        datasets: [
                            {
                                label: 'Vehículos',
                                data: [parkingStats.dailyEntries, parkingStats.dailyExits],
                                backgroundColor: ['#36A2EB', '#FF6384'],
                            },
                        ],
                    }}
                    options={{
                        scales: {
                            x: {
                                type: 'category', // Escala de tipo categoría en el eje X
                            },
                            y: {
                                beginAtZero: true, // Comenzar en 0 en el eje Y
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Dashboard;

