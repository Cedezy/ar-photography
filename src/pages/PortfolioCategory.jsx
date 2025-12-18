import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioImages } from '../data/portfolioImages';
import Footer from '../components/Footer';

const PortfolioCategory = () => {
    const { category } = useParams();

    const filteredImages = portfolioImages.filter((img) => img.slug === category);

     useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 px-6 py-10 bg-linear-to-br from-gray-50 via-white to-gray-100">
                <div className="max-w-7xl mx-auto">
                    <Link 
                        to="/" 
                        className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-8 transition-all duration-300"
                    >
                        <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
                        <span>Back to Home</span>
                    </Link>

                    <div className="mb-12 pb-8 border-b border-gray-200">
                        <h1 className="text-5xl md:text-6xl font-light mb-3 capitalize tracking-tight">
                            {category}
                        </h1>
                        <p className="text-gray-500 text-lg font-light mb-4">Photography Collection</p>
                        <p className="text-gray-600 leading-relaxed">
                            Explore our curated collection of {category} photography. Each image captures 
                            unique moments and perspectives, showcasing the artistry and emotion that defines 
                            this genre. From candid shots to carefully composed scenes, these photographs 
                            tell compelling visual stories.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredImages.map((image, index) => (
                            <div
                                key={image.id}
                                className="group relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 transform hover:-translate-y-2"
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                                }}
                            >
                                <div className="relative overflow-hidden bg-gray-200 aspect-square">
                                    <img
                                        src={image.url}
                                        alt={image.category}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-white font-light text-lg mb-1 capitalize">
                                                {image.category}
                                            </h3>
                                            <p className="text-white/80 text-sm">
                                                Photo {index + 1} of {filteredImages.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}</style>
            </div>
            <Footer/>
        </div>
    );
};

export default PortfolioCategory;
