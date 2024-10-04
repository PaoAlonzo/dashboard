import React, { useState, useEffect } from 'react';
import './MonitoreoParqueo.css';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Bar, Doughnut, PolarArea, Pie } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
Chart.register(ArcElement, Title, Tooltip, Legend);
Chart.register(ArcElement, Tooltip, Legend, RadialLinearScale);
Chart.register(ArcElement, Tooltip, Legend);

const Parqueo = () => {
    // Estado para los datos de las graficas
    const [vehiculosDentro, setVehiculosDentro] = useState(10); // Valor inicial de vehículos dentro (los valores iniciales son solo para ver la grafica sin la interaccion de la base de datos de lo contrario poner en 0)
    const [lugaresDisponibles, setLugaresDisponibles] = useState(90); // Valor inicial de lugares disponibles
    const [porcentajeOcupado, setPorcentajeOcupado] = useState(20); // Valor inicial de porcentaje ocupado
    const [porcentajeDesocupado, setPorcentajeDesocupado] = useState(80); // Valor inicial de porcentaje desocupado
    const [porcentajeInternos, setPorcentajeInternos] = useState(30); // Valor inicial de porcentaje Internos
    const [porcentajeExternos, setPorcentajeExternos] = useState(90); // Valor inicial de porcentaje Externos
    const [ingresosDuranteElDia, setIngresosDuranteElDia] = useState(0); // Valor inicial de ingresos durante el dia
    const [egresosDuranteElDia, setEgresosDuranteElDia] = useState(0); // Valor inicial de egresos durante el dia

    //USEEFFECT para la grafica de Barras - Lugares disponibles y no disponibles
    useEffect(() => {
        // Función para hacer fetch de los datos del servidor
        const fetchVehiculosAdentro = () => {
            fetch('http://127.0.0.1:8000/vehiculos_adentro')
                .then(response => response.json())
                .then(data => {
                    console.log("Vehículos dentro:", data);
                    if (data.vehiculos_adentro !== undefined) {
                        setVehiculosDentro(data.vehiculos_adentro);
                        setLugaresDisponibles(8 - data.vehiculos_adentro); // Asumiendo que hay 8 espacios totales
                    } else {
                        console.error('No se recibió el valor esperado:', data);
                    }
                })
                .catch(error => console.error('Error al obtener vehículos dentro:', error));
        };

        // Llamar a la función inmediatamente y luego cada 10 segundos
        fetchVehiculosAdentro();
        const intervalId = setInterval(fetchVehiculosAdentro, 10000);

        // Limpiar el intervalo cuando se desmonte el componente
        return () => clearInterval(intervalId);
    }, []);

    // Datos de la gráfica de barras
    const dataBarras = {
        labels: ['Numero de Lugares Ocupados', 'Numero de Lugares Disponibles'],
        datasets: [
            {
                label: 'Vehículos Dentro y Espacios Libres',
                data: [vehiculosDentro, lugaresDisponibles],
                backgroundColor: ['rgba(0, 204, 204, 0.7)', 'rgba(0, 128, 0, 0.6)'],
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

    
    //USEEFFECT para la grafica de anillo - % de ocupacion 
    useEffect(() => {
        // Función para hacer fetch de los datos del servidor
        const fetchPorcentajeOcupacion = () => {
            fetch('http://127.0.0.1:8000/porcentaje_ocupacion')
                .then(response => response.json())
                .then(data => {
                    console.log("Porcentaje de Ocupacion:", data);
                    if (data.porcentaje_ocupacion !== undefined) {
                        setPorcentajeOcupado(data.porcentaje_ocupacion);
                        setPorcentajeDesocupado(100 - data.porcentaje_ocupacion);
                    } else {
                        console.error('No se recibió el valor esperado en porcentaje de ocupacion:', data);
                    }
                })
                .catch(error => console.error('Error al obtener porcentaje de ocupacion:', error));
        };

        // Llamar a la función inmediatamente y luego cada 10 segundos
        fetchPorcentajeOcupacion();
        const intervalId = setInterval(fetchPorcentajeOcupacion, 10000);

        // Limpiar el intervalo cuando se desmonte el componente
        return () => clearInterval(intervalId);
    }, []);

    const dataAnillo = {
        labels: ['Porcentaje de Espacio Ocupado', 'Porcentaje de Espacio Disponible'],
        datasets: [
            {
                label: 'Porcentaje de ocupación del Parqueo',
                data: [porcentajeOcupado , porcentajeDesocupado],
                backgroundColor: ['rgba(105, 105, 105, 1)', '#ffce56'],
                borderWidth: 1,
            },
        ],
    };

    const optionsAnillo = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        // Obtener el valor
                        const value = tooltipItem.raw;
                        return value + '%'; // Agregar el símbolo de porcentaje
                    }
                }
            },
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Porcentaje de Ocupación del Parqueo',
            },
        },
    };

    //USEEFFECT para la grafica Polar Area - % de internos 
    useEffect(() => {
        // Función para hacer fetch de los datos del servidor
        const fetchPorcentajeExternos = () => {
            fetch('http://127.0.0.1:8000/porcentaje_usuarios_externos')
                .then(response => response.json())
                .then(data => {
                    console.log("Porcentaje de Users Externos:", data);
                    if (data.porcentaje_usuarios_externos !== undefined) {
                        setPorcentajeExternos(data.porcentaje_usuarios_externos);
                        setPorcentajeInternos(100 - data.porcentaje_usuarios_externos);
                    } else {
                        console.error('No se recibió el valor esperado en porcentaje de Externos:', data);
                    }
                })
                .catch(error => console.error('Error al obtener porcentaje de Externos:', error));
        };

        // Llamar a la función inmediatamente y luego cada 10 segundos
        fetchPorcentajeExternos();
        const intervalId = setInterval(fetchPorcentajeExternos, 10000);

        // Limpiar el intervalo cuando se desmonte el componente
        return () => clearInterval(intervalId);
    }, []);

    // Datos para el gráfico PolarArea
    const dataPolarArea = {
        labels: ['Interno', '', 'Externo', ''],
        datasets: [
            {
                label: 'Porcentaje',
                data: [porcentajeInternos, 0, porcentajeExternos, 0],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    '#ffff',       //'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    '#ffff',       //'rgba(54, 162, 235, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const optionsPolarArea = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        // Obtener el valor
                        const value = tooltipItem.raw;
                        return value + '%'; // Agregar el símbolo de porcentaje
                    }
                }
            },
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Gráfico Porcentaje de Usuarios Externos',
            },
        },
    };



    //USEEFFECT para la grafica de Pie - Ingresos durante el dia 
    useEffect(() => {
        // Función para hacer fetch de los datos del servidor
        const fetchCantidadIngresosDia = () => {
            fetch('http://127.0.0.1:8000/vehiculos_entrado')
                .then(response => response.json())
                .then(data => {
                    console.log("Cantidad de Ingresos durante el dia:", data);
                    if (data.vehiculos_entrado !== undefined) {
                        setIngresosDuranteElDia(data.vehiculos_entrado);
                    } else {
                        console.error('No se recibió el valor esperado en cantidad de ingresos en el dia:', data);
                    }
                })
                .catch(error => console.error('Error al obtener cantidad de ingresos en el dia:', error));
        };

        // Llamar a la función inmediatamente y luego cada 10 segundos
        fetchCantidadIngresosDia();
        const intervalId = setInterval(fetchCantidadIngresosDia, 10000);

        // Limpiar el intervalo cuando se desmonte el componente
        return () => clearInterval(intervalId);
    }, []);

    //USEEFFECT para la grafica de Pie - Egresos durante el dia 
    useEffect(() => {
        // Función para hacer fetch de los datos del servidor
        const fetchCantidadEgresosDia = () => {
            fetch('http://127.0.0.1:8000/vehiculos_salido')
                .then(response => response.json())
                .then(data => {
                    console.log("Cantidad de Egresos durante el dia:", data);
                    if (data.vehiculos_salido !== undefined) {
                        setEgresosDuranteElDia(data.vehiculos_salido);
                    } else {
                        console.error('No se recibió el valor esperado en cantidad de egresos en el dia:', data);
                    }
                })
                .catch(error => console.error('Error al obtener cantidad de egresos en el dia:', error));
        };

        // Llamar a la función inmediatamente y luego cada 10 segundos
        fetchCantidadEgresosDia();
        const intervalId = setInterval(fetchCantidadEgresosDia, 10000);

        // Limpiar el intervalo cuando se desmonte el componente
        return () => clearInterval(intervalId);
    }, []);

    // Datos para el gráfico Pie
    const dataPie = {
        labels: ['Ingresos', 'Egresos'],
        datasets: [
            {
                label: 'Cantidad',
                data: [ingresosDuranteElDia, egresosDuranteElDia],
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
                    <Doughnut data={dataAnillo} options={optionsAnillo} />
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
        <div>
            <h2>{title}</h2>
            {children}
        </div>
    );
};

export default Parqueo;



//Ejemplo grafica de anillo con valores interactivos aleatorios
    // Datos de la gráfica de anillo
    // const DataAnillo = () => {
    //     const [data, setData] = useState({
    //         labels: ['Espacio Ocupado', 'Espacio Disponibles'],
    //         datasets: [
    //             {
    //                 label: '% de ocupación del Parqueo',
    //                 data: [10, 90],
    //                 backgroundColor: ['#36a2eb', '#ffce56'],
    //                 borderWidth: 1,
    //             },
    //         ],
    //     });

    //     useEffect(() => {
    //         const interval = setInterval(() => {
    //             const newOccupied = Math.floor(Math.random() * 100);
    //             const newAvailable = 100 - newOccupied;

    //             setData({
    //                 labels: ['Espacio Ocupado', 'Espacio Disponibles'],
    //                 datasets: [
    //                     {
    //                         label: '% de ocupación del Parqueo',
    //                         data: [newOccupied, newAvailable],
    //                         backgroundColor: ['#36a2eb', '#ffce56'],
    //                     },
    //                 ],
    //             });
    //         }, 1000);

    //         return () => clearInterval(interval);
    //     }, []);

    //     return <Doughnut data={data} />;
    // };
