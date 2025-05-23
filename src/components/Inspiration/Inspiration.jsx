import {
    FaUtensils, FaIceCream, FaGlassMartiniAlt, FaLeaf,
    FaDrumstickBite, FaFish, FaCarrot, FaSeedling
} from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import inspiration1 from '../../assets/component-imgs/ins-1.png';
import inspiration2 from '../../assets/component-imgs/ins-2.png';
import 'animate.css';
import { Link } from 'react-router';

const categories = [
    { icon: <FaUtensils />, label: "Appetizers" },
    { icon: <FaIceCream />, label: "Desserts" },
    { icon: <FaGlassMartiniAlt />, label: "Drinks" },
    { icon: <FaLeaf />, label: "Healthy" },
    { icon: <FaDrumstickBite />, label: "Meat" },
    { icon: <FaFish />, label: "Seafood" },
    { icon: <FaCarrot />, label: "Vegan" },
    { icon: <FaSeedling />, label: "Unique" },
];

const Inspiration = () => {
    return (
        <section className="py-10 md:my-16 bg-[var(--color-section-bg)]">
            <div className="max-w-6xl mx-auto px-4">

                {/* Title and Description */}
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-4xl font-bold text-center mb-2">
                        🍽️ Get Inspired!
                    </h2>
                    <p className="text-center text-[var(--color-accent)] max-w-2xl mx-auto">
                        Discover new ideas, try exciting recipes, and bring flavor to your life! 🌍✨
                    </p>
                </div>

                {/* Image Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-10 animate__animated animate__fadeInUp">
                    {/* Card 1 */}
                    <div
                        className="relative h-96 rounded-xl overflow-hidden bg-cover bg-center text-white group"
                        style={{ backgroundImage: `url(${inspiration1})` }}
                    >
                        <div className="absolute inset-0 transition duration-300 group-hover:bg-opacity-50"></div>
                        <div className="absolute bottom-0 z-10 p-6">
                            <span className="text-sm px-3 py-1 rounded-full uppercase inline-block bg-red-500">Chef’s Tips</span>
                            <h2 className="text-2xl font-bold mt-3">
                                <Typewriter
                                    words={['Learn from the best and create culinary magic at home.']}
                                    loop={false}
                                    cursor
                                    cursorStyle="_"
                                    typeSpeed={60}
                                />
                            </h2>
                            <Link to='/all-recipes'>
                                <button className="mt-4 bg-white text-red-500 hover:bg-red-200 hover:text-red-600 transition px-4 py-2 hover:px-6 rounded-full font-semibold">See Recipes</button>
                            </Link>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div
                        className="relative h-96 rounded-xl overflow-hidden bg-cover bg-center text-black group"
                        style={{ backgroundImage: `url(${inspiration2})` }}
                    >
                        <div className="absolute inset-0 transition duration-300 group-hover:bg-opacity-30"></div>
                        <div className="absolute bottom-0 z-10 p-6 text-white">
                            <span className="text-sm px-3 py-1 rounded-full uppercase inline-block bg-red-500 text-white">Exclusive</span>
                            <h2 className="text-2xl font-bold mt-3 text-red-500">
                                <Typewriter
                                    words={['Add flavor, flair, and creativity to your meals.']}
                                    loop={false}
                                    cursor
                                    cursorStyle="_"
                                    typeSpeed={60}
                                />
                            </h2>
                            <Link to='/all-recipes'>
                                <button className="mt-4 bg-white text-red-500 hover:bg-red-200 hover:text-red-600 transition px-4 py-2 hover:px-6 rounded-full font-semibold">See Recipes</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mini Cards with Hover and Centered Alignment */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 text-center">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center text-gray-700 bg-white hover:bg-red-500 hover:text-white transition-all duration-300 p-4 rounded-xl shadow-sm cursor-pointer text-sm font-medium"
                        >
                            <div className="text-2xl mb-1">{cat.icon}</div>
                            <div>{cat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Inspiration;
