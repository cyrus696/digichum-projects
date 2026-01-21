import React from 'react';

const Newsletter = () => {
    return (
        <section id="Contact-us" className="relative min-h-[600px] flex justify-center items-center text-center py-[80px] px-5 bg-cover bg-center"
            style={{ backgroundImage: `url('/assets/newsletter_bg_1768560853860.png')` }}
        >
            {/* Dark overlay mentioned in responsive CSS of original file (lines 797)? The original code had a second media query block that set background to something else and added overlay.
                We'll stick to the desktop design primarily but add a slight overlay for readability if needed.
             */}
            <div className="w-full max-w-[800px]">
                <h2 className="text-[32px] text-white font-light mb-10 leading-[1.4] tracking-[0.5px]">
                    Keep yourself updated on the latest luxury<br />property available
                </h2>

                <form className="flex justify-center gap-5 mb-[30px] flex-wrap">
                    <input type="text" placeholder="Name*" required className="p-[14px_20px] rounded-[20px] border-none text-sm outline-none min-w-[200px]" />
                    <input type="email" placeholder="Email*" required className="p-[14px_20px] rounded-[20px] border-none text-sm outline-none min-w-[200px]" />
                    <input type="tel" placeholder="Phone" className="p-[14px_20px] rounded-[20px] border-none text-sm outline-none min-w-[200px]" />
                </form>

                <div className="flex items-start gap-3 text-[#ddd] text-[13px] text-left max-w-[700px] mx-auto leading-[1.5]">
                    <input type="checkbox" id="consent" className="mt-1 accent-[#3C3713]" />
                    <label htmlFor="consent">
                        By providing your contact information, you acknowledge and agree to Dwello Homes' Privacy
                        Policy and consent to receiving marketing communications, including automated calls, texts,
                        and emails. Consent is not a condition of purchase. You may opt out at any time.
                    </label>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
