import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-6 border-t border-gray-200">
            <div className="max-w-7xl mx-auto text-center text-gray-600">
                <p className="text-sm tracking-wide">© {currentYear} AR Photography. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
