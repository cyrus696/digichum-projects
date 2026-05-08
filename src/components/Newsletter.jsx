


const Newsletter = () => {
    return (
        <section id="Contact-us" className="relative min-h-[500px] flex justify-center items-center text-center py-[80px] px-5 bg-[#0f1311] border-t border-white/5">
            <div className="w-full max-w-[800px]">
                <h2 className="text-[32px] text-white font-light mb-10 leading-[1.4] tracking-[0.5px]">
                    Keep yourself updated on the latest luxury<br />property available
                </h2>

                <form className="flex justify-center gap-4 mb-[30px] flex-wrap">
                    <input type="text" placeholder="Name*" required className="px-5 py-3.5 rounded-xl border border-white/10 text-sm outline-none min-w-[200px] bg-white/5 text-white placeholder-white/50 focus:border-blue-500 focus:bg-white/10 transition-colors" />
                    <input type="email" placeholder="Email*" required className="px-5 py-3.5 rounded-xl border border-white/10 text-sm outline-none min-w-[200px] bg-white/5 text-white placeholder-white/50 focus:border-blue-500 focus:bg-white/10 transition-colors" />
                    <input type="tel" placeholder="Phone" className="px-5 py-3.5 rounded-xl border border-white/10 text-sm outline-none min-w-[200px] bg-white/5 text-white placeholder-white/50 focus:border-blue-500 focus:bg-white/10 transition-colors" />
                    <button type="submit" className="px-8 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors">Submit</button>
                </form>

                <div className="flex items-start gap-3 text-white/60 text-[13px] text-left max-w-[700px] mx-auto leading-[1.5]">
                    <input type="checkbox" id="consent" className="mt-1 accent-blue-500" />
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
