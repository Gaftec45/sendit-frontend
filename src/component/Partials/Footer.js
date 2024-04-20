import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaGoogle, FaPinterest, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About</h2>
                    <p>Careers</p>
                    <p>Partnership</p>
                    <p>Our Team</p>
                    <p>Privacy Policy</p>
                </div>
                <div className="footer-section service">
                    <h2>Our Service</h2>
                    <p>Shipping Packages</p>
                    <p>Worldwide Shipping</p>
                    <p>Interstate Shipping</p>
                    <p>Local Shipping</p>
                </div>
                <div className="footer-section why-us">
                    <h2>Why Us</h2>
                    <p>Fast Shipping</p>
                    <p>Best Customer Service</p>
                    <p>Very Fast and Reliable</p>
                    <p>Easy to Track Progress</p>
                </div>
                <div className="footer-section social">
                    <FaFacebook className="icon" />
                    <FaInstagram className="icon" />
                    <FaLinkedin className="icon" />
                    <FaGoogle className="icon" />
                    <FaPinterest className="icon" />
                    <FaTwitter className="icon" />
                </div>
            </div>
            <div className="footer-bottom">
                <span>Our carrier is to fulfill your order and get it at your door step</span>
                <div className="logo">
                    <span><b>sendIT</b></span>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;