import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { portfolioImages } from '../data/portfolioImages';
import { services } from '../data/Services';
import { useNavigate } from 'react-router-dom';
import myphoto from '../assets/me.jpg';
import { Menu, X, Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import emailjs from "@emailjs/browser";

const ARPhotography = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isVisible, setIsVisible] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

     useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            {
                name: formData.name,
                email: formData.email,
                message: formData.message,
            },
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
            alert("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
            setLoading(false);
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            alert("Failed to send message. Try again later.");
            setLoading(false);
        });
    };

    return (
        <div className="bg-white text-gray-900 font-sans">
            <Header activeSection={activeSection} setActiveSection={setActiveSection} />

            <section id="home" className="h-screen relative flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={myphoto}
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-tight">AR Photography</h1>
                    <p className="text-xl md:text-2xl font-light tracking-wide opacity-90">
                        Capturing Moments, Creating Memories
                    </p>
                    <p className="text-lg md:text-xl font-light mt-2">
                        Turning every moment into timeless memories — let's make your story unforgettable.
                    </p>
                    <p className="text-sm md:text-base mt-1">
                        Scroll down to explore my portfolio, services, and contact details.
                    </p>

                    <button 
                        className="mt-8 px-8 py-3 border-2 border-gray-50 text-white hover:bg-gray-100 hover:text-gray-900 ease-in-out duration-500 cursor-pointer text-sm uppercase tracking-wider"
                    >
                        View Portfolio
                    </button>
                </div>
            </section>

            <section id="portfolio" className="py-20 px-6" data-animate>
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Portfolio</h2>
                        <p className="text-gray-600 text-lg">A curated collection of my finest work</p>
                        <p className="text-gray-500 text-md mb-6">
                            Explore a variety of projects including portraits, weddings, events, and commercial work.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolioImages.slice(0, 6).map((image, index) => (
                            <div key={image.id}
                                onClick={() => navigate(`/portfolio/${image.slug}`)}
                                className={`group cursor-pointer relative overflow-hidden aspect-square transition-all duration-700 delay-${index * 100} ${
                                    isVisible.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}>
                                <img
                                    src={image.url}
                                    alt={image.category}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-white text-lg tracking-wider text-center">
                                            {image.category} <br /> Click to view details
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section id="about" className="py-20 px-6 bg-gray-50" data-animate>
                <div className="max-w-6xl mx-auto">
                    <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="order-2 md:order-1">
                            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">About Me</h2>
                           <p className="text-gray-700 mb-4 leading-relaxed">
                                With many years of experience in professional photography, I specialize in capturing authentic moments that tell compelling stories. My work combines technical skill with an artistic eye, ensuring that every scene is not only seen but truly felt.
                            </p>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                From intimate portraits to sweeping landscapes, each photograph is crafted with meticulous attention to detail, light, composition, and emotion. Beyond the lens, I enhance images through expert photo editing and design, transforming them into striking visuals ready for print, digital media, or custom T-shirt designs.
                            </p>

                        </div>

                        <div className="order-1 md:order-2">
                            <img
                                src={myphoto}
                                alt="Photographer"
                                className="w-full h-full object-cover rounded-sm shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="py-20 px-6" data-animate>
                <div className="max-w-6xl mx-auto">
                    <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Services</h2>
                        <p className="text-gray-600 text-lg">Professional photography tailored to your needs</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={service.title}
                                className={`p-8 border border-gray-200 hover:border-gray-400 transition-all duration-500 delay-${index * 100} ${
                                isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}>
                                <h3 className="text-xl font-light mb-4 tracking-wide">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed mt-2">
                                    {service.description} <span className="text-gray-400">— perfect for personal and business projects.</span>
                                </p>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="py-20 px-6 bg-gray-50" data-animate>
                <div className="max-w-4xl mx-auto">
                    <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">Get In Touch</h2>
                        <p className="text-gray-600 text-lg">Let's create something beautiful together</p>
                    </div>

                    <div className={`grid md:grid-cols-2 gap-10 md:gap-40 transition-all duration-1000 delay-300 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none transition-colors"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none transition-colors"
                            />
                            <textarea
                                rows={5}
                                placeholder="Your Message"
                                required
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 outline-none transition-colors resize-none"
                            ></textarea>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 text-sm uppercase tracking-wider transition-all duration-300
                                    ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-700'}
                                    text-white flex items-center justify-center gap-2`}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <Mail className="text-gray-600 mt-1" size={20} />
                                <div>
                                    <h4 className="font-medium mb-1">Email</h4>
                                    <p className="text-gray-600">aldheser16@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Phone className="text-gray-600 mt-1" size={20} />
                                <div>
                                    <h4 className="font-medium mb-1">Phone</h4>
                                    <p className="text-gray-600">0952-576-3218</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <MapPin className="text-gray-600 mt-1" size={20} />
                                <div>
                                    <h4 className="font-medium mb-1">Location</h4>
                                    <p className="text-gray-600">Pagadian City, Philippines</p>
                                </div>
                            </div>

                            <div className="pt-6">
                                <h4 className="font-medium mb-4">Follow Me</h4>
                                <div className="flex space-x-4">
                                    <a href="https://www.instagram.com/aldheseracalal/" className="text-gray-600 hover:text-gray-900 transition-colors">
                                        <Instagram size={24} />
                                    </a>
                                    <a href="https://www.facebook.com/profile.php?id=100091950167350" className="text-gray-600 hover:text-gray-900 transition-colors">
                                        <Facebook size={24} />
                                    </a>
                                    <a href="mailto:aldheser16@gmail.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                                        <Mail size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default ARPhotography;
