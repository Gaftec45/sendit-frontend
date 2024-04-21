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

/* import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaGoogle, FaPinterest, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='footer-section'>
        <footer className="bg-dark text-white">
                <div className="row">
                    <div className="col-md-3">
                        <h2>About</h2>
                        <p>Careers</p>
                        <p>Partnership</p>
                        <p>Our Team</p>
                        <p>Privacy Policy</p>
                    </div>
                    <div className="col-md-3">
                        <h2>Our Service</h2>
                        <p>Shipping Packages</p>
                        <p>Worldwide Shipping</p>
                        <p>Interstate Shipping</p>
                        <p>Local Shipping</p>
                    </div>
                    <div className="col-md-3">
                        <h2>Why Us</h2>
                        <p>Fast Shipping</p>
                        <p>Best Customer Service</p>
                        <p>Very Fast and Reliable</p>
                        <p>Easy to Track Progress</p>
                    </div>
                    <div className="col-md-3">
                        <h2>Social</h2>
                        <div className="social-icons">
                            <FaFacebook className="icon" />
                            <FaInstagram className="icon" />
                            <FaLinkedin className="icon" />
                            <FaGoogle className="icon" />
                            <FaPinterest className="icon" />
                            <FaTwitter className="icon" />
                        </div>
                    </div>
                </div>
            <div className="footer-bottom bg-secondary py-3">

                    <div className="row">
                        <div className="col-md-6">
                            <span>Our carrier is to fulfill your order and get it at your doorstep</span>
                        </div>
                        <div className="col-md-6 text-end">
                            <div className="logo">
                                <span className="text-white"><b>sendIT</b></span>
                            </div>
                        </div>
                    </div>
                </div>
        </footer>
        </div>
    );
}
 
export default Footer; */