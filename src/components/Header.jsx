import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ activeSection, setActiveSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const sections = ['home', 'portfolio', 'about', 'services', 'contact'];

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-light tracking-wider cursor-pointer" onClick={() => navigate('/')}>
                    AR Photography
                </h2>

                <div className="hidden md:flex space-x-8">
                    {sections.map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item)}
                            className={`text-sm uppercase tracking-wide ease-in-out cursor-pointer duration-300 hover:text-gray-600 ${
                                activeSection === item ? 'text-gray-900 font-medium' : 'text-gray-500'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="flex flex-col space-y-4 px-6 py-6">
                        {sections.map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className="text-left text-sm uppercase tracking-wide text-gray-600 hover:text-gray-900 ease-in-out duration-300 cursor-pointer"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
