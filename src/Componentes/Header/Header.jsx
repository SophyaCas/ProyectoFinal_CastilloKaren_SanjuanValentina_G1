import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Componentes/Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo1 from '../../assets/img1.png';
import logo3 from '../../assets/img3.png';
import { HashLink } from 'react-router-hash-link';


const Header = () => {
    const { currentUser, userRole, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleLoginClick = () => {
    navigate('/login');
    setTimeout(() => {
        const section = document.getElementById('login-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300);
};
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/PublicHomePage');

            setIsMenuOpen(false);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };
    const handleDashboard = () => {
        navigate('/dashboard');
        setIsMenuOpen(false);
    };
    const handleHomeClick = () => {
        navigate('/');
        setIsMenuOpen(false);
    };

    const carouselImages = [
        "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=2069&q=80"
    ];

    // Rotación automática del carrusel
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % carouselImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <header className="glass-header">
                <div className="header-top">
                    <div className="header-container">
                        {/* Logo */}
                        <div className="header-brand" onClick={handleHomeClick}>
                            <img src={logo1} alt="NotiSphere" className="header-logo" />
                            <span className="brand-text"><img src={logo3} alt="NotiSphere" className="header-logo" /></span>
                        </div>

                        {/* Navegación escritorio */}
                        <nav className="header-nav desktop-nav">
                            {currentUser ? (
                                <div className="user-menu">
                                    <div className="user-info">
                                        <div className="user-avatar"><i className="bi bi-person-fill"></i></div>
                                        <div className="user-details">
                                            <span className="user-email">{currentUser.email}</span>
                                            <span className="user-role">{userRole}</span>
                                        </div>
                                    </div>
                                    <div className="nav-actions">
                                        <button onClick={handleDashboard} className="nav-btn primary">
                                            <i className="fas fa-tachometer-alt"></i> Dashboard
                                        </button>
                                        <button onClick={handleLogout} className="nav-btn secondary">
                                            <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button onClick={handleLoginClick} className="nav-btn primary">
                                    <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                                </button>
                            )}
                        </nav>

                        {/* Botón móvil */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </div>

                {/* NavBar inferior */}
                <div className="header-bottom">
                    <nav className="integrated-navbar">
                        <div className="nav-container">
                            <div className="navbar-nav">
                                <a className="nav-link" href="/PublicHomePage">
                                    <i className="fas fa-home me-1"></i> Inicio
                                </a>
                                <a className="nav-link" href="/PublicHomePage#noticias">
                                    <i className="fas fa-newspaper me-1"></i> Noticias
                                </a>

                                <div
                                    className="nav-dropdown"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <button
                                        className="nav-link "
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <i className="fas fa-tags me-1"></i> Categorías
                                        <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'} ms-1`}></i>
                                    </button>

                                    <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                                        <li><a href="/PublicHomePage?category=Deportes#noticias">Deportes</a></li>
                                        <li><a href="/PublicHomePage?category=Cultura#noticias">Cultura</a></li>
                                        <li><a href="/PublicHomePage?category=Tecnología#noticias">Tecnología</a></li>
                                        <li><a href="/PublicHomePage?category=Política#noticias">Política</a></li>
                                        <li><a href="/PublicHomePage?category=Salud#noticias">Salud</a></li>
                                        <li><a href="/PublicHomePage?category=Economia#noticias">Economía</a></li>
                                        <li><a href="/PublicHomePage?category=Educacion#noticias">Educación</a></li>
                                    </ul>
                                </div>

                                <a className="nav-link" href="/ContactPage">
                                    <i className="fas fa-envelope me-1"></i> Contacto
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* MENÚ MÓVIL FUNCIONAL */}
            {isMenuOpen && (
                <div className="mobile-nav-overlay" onClick={() => setIsMenuOpen(false)}>
                    <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
                        {currentUser ? (
                            <>
                                <div className="mobile-user-info">
                                    <div className="user-avatar"><i className="bi bi-person-fill"></i></div>
                                    <div>
                                        <p className="user-email">{currentUser.email}</p>
                                        <p className="user-role">{userRole}</p>
                                    </div>
                                </div>
                                <button
                                    className="mobile-nav-btn"
                                    onClick={() => {
                                        handleDashboard();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <i className="fas fa-tachometer-alt"></i> Dashboard
                                </button>
                                <button
                                    className="mobile-nav-btn logout"
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <button
                                className="mobile-nav-btn"
                                onClick={() => {
                                    handleLoginClick();
                                    setIsMenuOpen(false);
                                }}
                            >
                                <i className="fas fa-sign-in-alt"></i> Iniciar sesión
                            </button>
                        )}

                        <hr style={{ margin: '1rem 0', opacity: 0.3 }} />

                        <a
                            className="mobile-nav-btn"
                            href="/PublicHomePage"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="fas fa-home me-1"></i> Inicio
                        </a>
                        <a
                            className="mobile-nav-btn"
                            href="/PublicHomePage#noticias"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="fas fa-newspaper me-1"></i> Noticias
                        </a>
                        <a
                            className="mobile-nav-btn"
                            href="/ContactPage"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <i className="fas fa-envelope me-1"></i> Contacto
                        </a>
                    </div>
                </div>
            )}

            {/*  FIN MENÚ MÓVIL */}

            {/* Hero con carrusel funcional */}
            <div className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="title-gradient-blue">NewsPhere</h1>
                        <p className="hero-subtitle fuenteV">Tu portal de noticias corporativas más confiable</p>
                        <p className="hero-description">
                            Mantente informado con las últimas noticias de tu empresa.
                            Actualizaciones en tiempo real, reportes exclusivos y
                            análisis profundos de los eventos más relevantes.
                        </p>
                    </div>

                    {/* Carrusel React funcional */}
                    <div className="hero-carousel">
                        <div className="carousel-container">
                            {carouselImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`carousel-slide ${index === activeIndex ? 'active' : ''}`}
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        opacity: index === activeIndex ? 1 : 0,
                                        transition: 'opacity 1s ease-in-out',
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
