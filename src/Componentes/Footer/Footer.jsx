import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo2 from '../../assets/img2.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="FooterPrincipal" className="footer-elegant">
            <div className="footer-container">
                
                {/* --- PARTE SUPERIOR --- */}
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img src={logo2} alt="NotiSphere" className="header-logo" />
                            <span>Newsphere</span>
                        </div>
                        <p className="footer-description">
                            Tu fuente confiable de noticias actualizadas, con estilo, precisión y elegancia.
                        </p>
                    </div>

                    <div className="footer-links">
                        <Link to="/" className="footer-link">Inicio</Link>
                        <Link to="/login" className="footer-link">Administración</Link>
                    </div>
                </div>

                <div className="footer-divider"></div>

                {/* --- REDES SOCIALES --- */}
                <div className="footer-socials">
                    <a href="https://www.facebook.com/login" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com/accounts/login" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://twitter.com/i/flow/login" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com/login" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>

                <div className="footer-divider"></div>

                {/* --- PARTE INFERIOR --- */}
                <div className="footer-bottom">
                    <p>&copy; {currentYear} NotiSphere. Todos los derechos reservados.</p>
                    <p className="footer-credits">
                        Diseñado con mucho LOVE por <strong>Karen Sophya Castillo</strong> y <strong>Valentina Sanjuan Ramos</strong>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
