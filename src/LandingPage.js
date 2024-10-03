import React, { useState } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook para redirigir

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === '123') {
            navigate('/dashboard'); // Redirige al dashboard si las credenciales son correctas
        } else {
            alert('Credenciales incorrectas'); // Mensaje de error si las credenciales son incorrectas
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
