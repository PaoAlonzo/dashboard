import React, { useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook para redirigir


    // Función para el login ya funciona no toquen nada 😊
    const handleLogin = async (e) => {
        e.preventDefault();
    
        // URL de la API
        const url = `http://127.0.0.1:8000/login/${username}/${password}`;

        // console.log(url);
        // console.log(username);
        // console.log(password);
    
        try {
            // Realiza la solicitud fetch
            const response = await fetch(url, {
                method: 'GET', // o 'POST' si tu API lo requiere
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Comprueba si la respuesta es exitosa
            if (response.ok) {
                const data = await response.json(); // Parsear la respuesta JSON
    
                // Verificar si el login fue exitoso
                if (data.login === "true") {
                    navigate('/dashboard'); // Redirige al dashboard si las credenciales son correctas
                } else {
                    alert('Usuario y contraseña incorrectos'); // Mensaje de error si las credenciales son incorrectas
                }
            } else {
                alert('Error en la solicitud'); // Mensaje de error en caso de un fallo en la solicitud
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al intentar iniciar sesión'); // Mensaje de error en caso de excepción
        }
    };
    

    return (
        <div className="LandingPage">
            <Parallax pages={2} style={{ top: '0', left: '0' }}>
                {/* Capas de animación para el efecto parallax */}
                <ParallaxLayer offset={0} speed={0.1}>
                    <div className="animation_layer" id="d1"></div> {/* Background */}
                </ParallaxLayer>

                <ParallaxLayer offset={0.2} speed={0.1}>
                    <div className="animation_layer" id="d2"></div> {/* Imagen 1 */}
                </ParallaxLayer>

                <ParallaxLayer offset={0.4} speed={0.35}>
                    <div className="animation_layer" id="d3"></div> {/* Imagen 2 */}
                </ParallaxLayer>

                <ParallaxLayer offset={0.6} speed={0.4}>
                    <div className="animation_layer" id="d4"></div> {/* Imagen 3 */}
                </ParallaxLayer>

                <ParallaxLayer offset={0.8} speed={0.5}>
                    <div className="animation_layer" id="d5"></div> {/* Imagen 4 */}
                </ParallaxLayer>

                {/* Contenido principal y formulario de login */}
                <ParallaxLayer offset={0} speed={0.5} className="parallax-background">
                    <div className="content">
                        <h1>Bienvenido a Parking 4.0</h1>
                        {/* <p>↓</p> */}
                        <a href="#login-id">
                            Scroll-down para ingresar
                        </a>

                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={1} speed={1} className="login-background">
                    <div className="login-container" id='login-id'>
                        <h2>Iniciar Sesión</h2>
                        <form className="login-form" onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Ingresar</button>
                        </form>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    );
};

export default LandingPage;
