import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#3C3713] text-white p-[60px_80px] flex justify-between items-start flex-wrap gap-10 max-md:flex-col max-md:p-[40px_30px]">
            <div className="flex flex-col gap-10">
                <div className="text-[28px] font-normal tracking-[1px]">Dwello</div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-[#eee]">+1 246 232 4444</p>
                    <p className="text-sm text-[#eee]">DwelloHomes@gmail.com</p>
                </div>
            </div>

            <div className="flex items-center max-md:w-full max-md:flex-col max-md:gap-5">
                <div className="p-[20px_40px] rounded-lg flex items-center gap-[30px] max-md:flex-col max-md:w-full max-md:p-5 max-md:gap-5">
                    <a href="#" className="text-white no-underline text-sm transition-opacity hover:opacity-80">Home</a>
                    <a href="#" className="text-white no-underline text-sm transition-opacity hover:opacity-80">About Us</a>
                    <a href="#Contact-us" className="text-white no-underline text-sm transition-opacity hover:opacity-80">Contact</a>

                    <div className="flex gap-[15px] ml-5 items-center max-md:ml-0">
                        {/* SVGs */}
                        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" className="cursor-pointer transition-transform hover:-translate-y-[2px]">
                            <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12C2 16.53 5.38 20.32 9.69 21.67V14.65H7.7V12H9.69V10.23C9.69 8.35 10.89 7.29 12.63 7.29C13.46 7.29 14.18 7.35 14.18 7.35V9.19H13.25C12.31 9.19 12 9.78 12 10.37V12H13.97L13.67 14.65H12V21.67C16.31 20.32 19.69 16.53 19.69 12C19.69 6.53 15.19 2.04 12 2.04Z" />
                        </svg>
                        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" className="cursor-pointer transition-transform hover:-translate-y-[2px]">
                            <path fill="currentColor" d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                        </svg>
                        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" className="cursor-pointer transition-transform hover:-translate-y-[2px]">
                            <path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                        </svg>
                        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" className="cursor-pointer transition-transform hover:-translate-y-[2px]">
                            <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
