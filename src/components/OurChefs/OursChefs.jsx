// src/components/OurChefs.jsx
import React from 'react';
import chef1 from '../../assets/component-imgs/chef-1.jpg';
import chef2 from '../../assets/component-imgs/chef-2.jpg';
import chef3 from '../../assets/component-imgs/chef-3.jpg';
import chef4 from '../../assets/component-imgs/chef-4.jpg';
import chef5 from '../../assets/component-imgs/chef-5.jpg';
import chef6 from '../../assets/component-imgs/chef-6.jpg';
import chef7 from '../../assets/component-imgs/chef-7.jpg';

const chefs = [
    { name: 'Liam Carter', image: chef1 },
    { name: 'Sophia Mitchell', image: chef2 },
    { name: 'Olivia Brooks', image: chef3 },
    { name: 'Chloe Sanders', image: chef4 },
    { name: 'Ethan Parker', image: chef5 },
    { name: 'Sophia Bennett', image: chef6 },
    { name: 'James Harrison', image: chef7 },
];

const OurChefs = () => {
    return (
        <div className="text-center py-10 md:py-20 px-4 bg-[var(--color-section-bg)]">
          <div className='mb-8'>
                <h2 className="text-3xl md:text-4xl text[var(--color-primary)] font-bold text-center mb-2 md:mb-4">
                    🍽️ Our Chefs!
                </h2>
                <p className="text-xs sm:text-sm text-center text-[var(--color-accent)] max-w-2xl mx-auto">
                    Get to know the talented writers and chefs behind our recipes and articles. Explore their stories and favorite dishes! 🌍✨
                </p>

          </div>

            <div className="flex justify-center items-center flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 mt-6 md:mt-12">
                {chefs.map((chef, index) => (
                    <div
                        key={index}
                        className="w-[100px] flex flex-col items-center transform transition duration-500 hover:-translate-y-1"
                    >
                        <img
                            src={chef.image}
                            alt={chef.name}
                            className="w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 rounded-full object-cover mb-2 border shadow"
                        />
                        <span className="text-[10px] text-[var(--color-secondary)] font-medium">Contributor</span>
                        <h3 className="text-xs font-semibold text-[var(--color-accent)] text-center">{chef.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurChefs;
