import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useSpring, animated } from '@react-spring/web';
import { FaUser, FaLock, FaGoogle } from 'react-icons/fa';
import r1 from './imagenes/r1.png';
import r2 from './imagenes/r2.png';
import r3 from './imagenes/r3.png';
import './LandingPage.css';

const LandingPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const navigate = useNavigate();

    // Efecto de movimiento con el mouse
    const handleMouseMove = (e) => {
        setOffsetX(e.clientX / window.innerWidth);
        setOffsetY(e.clientY / window.innerHeight);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === '123') {
            navigate('/dashboard');
        } else {
            alert('Credenciales incorrectas');
        }
    };

    const handleForgotPassword = () => {
        alert('Funcionalidad de recuperación de contraseña');
    };

    const handleSocialLogin = (platform) => {
        alert(`Inicio de sesión con ${platform}`);
    };

    // Control de la animación de las capas de fondo
    const parallaxStyle2 = useSpring({
        transform: `translate(${offsetX * 20}px, ${offsetY * 20}px)`, // Reduce el movimiento
    });
    const parallaxStyle3 = useSpring({
        transform: `translate(${offsetX * 10}px, ${offsetY * 10}px)`, // Reduce aún más el movimiento
    });

    return (
        <div className="LandingPage" onMouseMove={handleMouseMove}>
            <Parallax pages={1}>
                {/* Capa 1: Imagen de fondo estática */}
                <ParallaxLayer offset={0} speed={0}>
                    <div
                        style={{
                            backgroundImage: `url(${r1})`,
                            backgroundSize: 'cover',
                            height: '100vh',
                            position: 'absolute',
                            width: '100%',
                        }}
                    />
                </ParallaxLayer>
    
                {/* Capa 2: Segunda imagen con movimiento más sutil */}
                <ParallaxLayer offset={0} speed={0.2}>
                    <animated.div
                        style={{
                            ...parallaxStyle2,
                            backgroundImage: `url(${r2})`,
                            backgroundSize: 'cover',
                            height: '100vh',
                            position: 'absolute',
                            width: '100%',
                        }}
                    />
                </ParallaxLayer>
    
                {/* Capa 3: Tercera imagen con movimiento más sutil */}
                <ParallaxLayer offset={0} speed={0.1}>
                    <animated.div
                        style={{
                            ...parallaxStyle3,
                            backgroundImage: `url(${r3})`,
                            backgroundSize: 'cover',
                            height: '100vh',
                            position: 'absolute',
                            width: '100%',
                        }}
                    />
                </ParallaxLayer>
    
                {/* Capa del contenido */}
                <ParallaxLayer offset={0} speed={1}>
                    <div className="content">
                        <h1>Bienvenido a Parking 4.0</h1>
                        <div className="login-container">
                            <h2>Iniciar Sesión</h2>
                            <form className="login-form" onSubmit={handleLogin}>
                                <div className="input-group">
                                    <FaUser className="input-icon" />
                                    <input
                                        type="text"
                                        placeholder="Usuario"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <FaLock className="input-icon" />
                                    <input
                                        type="password"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit">Ingresar</button>
                            </form>
                            <div className="forgot-password">
                                <button onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</button>
                            </div>
                            <div className="social-login">
                                <button onClick={() => handleSocialLogin('Google')} className="google">
                                    <FaGoogle /> Google
                                </button>
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    );
    
};

export default LandingPage;
