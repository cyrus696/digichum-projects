import React from 'react';

const Projects = () => {
    return (
        <section className="w-full">
            {/* Item 1 */}
            <div className="relative w-full h-[400px] overflow-hidden border-b-2 border-[#0f1311] group max-md:h-[300px]">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 z-10 group-hover:blur-[8px] group-hover:brightness-75 group-hover:scale-105"
                    style={{ backgroundImage: `url('/assets/project-1.jpg')` }}
                ></div>
                <div className="absolute inset-0 z-20 flex items-center px-[100px] pointer-events-none justify-end text-right bg-black/25 max-md:px-[30px]">
                    <h2 className="text-[38px] font-thin text-white uppercase tracking-[1px] leading-[1.3] shadow-black drop-shadow-md max-md:text-[28px]">
                        Luxury living, brought to life<br /> &larr; by us
                    </h2>
                </div>
            </div>

            {/* Item 2 */}
            <div className="relative w-full h-[400px] overflow-hidden border-b-2 border-[#0f1311] group max-md:h-[300px]">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 z-10 group-hover:blur-[8px] group-hover:brightness-75 group-hover:scale-105"
                    style={{ backgroundImage: `url('/assets/project-2.jpg')` }}
                ></div>
                <div className="absolute inset-0 z-20 flex items-center px-[100px] pointer-events-none justify-start text-left bg-black/25 max-md:px-[30px]">
                    <h2 className="text-[38px] font-thin text-white uppercase tracking-[1px] leading-[1.3] shadow-black drop-shadow-md max-md:text-[28px]">
                        Projects that define modern<br />living &rarr;
                    </h2>
                </div>
            </div>

            {/* Item 3 */}
            <div className="relative w-full h-[400px] overflow-hidden border-b-2 border-[#0f1311] group max-md:h-[300px]">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 z-10 group-hover:blur-[8px] group-hover:brightness-75 group-hover:scale-105"
                    style={{ backgroundImage: `url('/assets/project-3.jpg')` }}
                ></div>
                <div className="absolute inset-0 z-20 flex items-center px-[100px] pointer-events-none justify-end text-right bg-black/25 max-md:px-[30px]">
                    <h2 className="text-[38px] font-thin text-white uppercase tracking-[1px] leading-[1.3] shadow-black drop-shadow-md max-md:text-[28px]">
                        Luxury that feels calm, minimal<br />&larr; and indulgent
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default Projects;
