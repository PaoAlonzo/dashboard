import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Bar, Doughnut, PolarArea, Pie } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
Chart.register(ArcElement, Title, Tooltip, Legend);
Chart.register(ArcElement, Tooltip, Legend, RadialLinearScale);
Chart.register(ArcElement, Tooltip, Legend);

const Parqueo = () => {
    // Datos de la gráfica de barras
    const dataBarras = {
        labels: ['Numero de Lugares Ocupados', 'Numero de Lugares Disponibles'],
        datasets: [
            {
                label: 'Vehículos Dentro y Fuera del Parqueo',
                data: [20, 90],
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

    // Datos de la gráfica de anillo
    const DataAnillo = () => {
        const [data, setData] = useState({
            labels: ['Espacio Ocupado', 'Espacio Disponibles'],
            datasets: [
                {
                    label: '% de ocupación del Parqueo',
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
                            label: '% de ocupación del Parqueo',
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

    // Datos para el gráfico PolarArea
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

    // Datos para el gráfico Pie
    const dataPie = {
        labels: ['Ingresos', 'Egresos'],
        datasets: [
            {
                label: 'Cantidad',
                data: [12, 19],
                backgroundColor: [
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 0.6)',
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
                text: 'Gráfico Cantidad de Ingresos y Egresos en el Día',
            },
        },
    };

    return (
        <div className='panelcardParqueo'>
            {/* Tarjetas para las gráficas */}
            <div className='cardParqueo'>
                <Card title="Panel de Monitoreo Vehículos Dentro y Fuera del Parqueo">
                    <Bar data={dataBarras} options={optionsBarras} />
                </Card>
            </div>
            <div className='cardParqueo'>
                <Card title="Panel de Monitoreo Porcentaje de Ocupación del Parqueo">
                    <DataAnillo />
                </Card>
            </div>
            <div className='cardParqueo'>
                <Card title="Panel de Monitoreo Porcentaje de Usuarios Externos">
                    <PolarArea data={dataPolarArea} options={optionsPolarArea} />
                </Card>
            </div>
            <div className='cardParqueo'>
                <Card title="Panel de Monitoreo Ingresos y Egresos durante el Día">
                    <Pie data={dataPie} options={optionsPie} />
                </Card>
            </div>
        </div>
    );
};

// Componente para la tarjeta
const Card = ({ title, children }) => {
    return (
        <div >
            <h2>{title}</h2>
            {children}
        </div>
    );
};

export default Parqueo;
