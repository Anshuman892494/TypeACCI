import Header from "../../components/Header";
import Footer from "../../components/Footer";
import typingBg from '../../assets/typing_key.jpeg';
import { Link } from "react-router-dom";

// Feature Card Component
const FeatureCard = ({ icon, title, children, items, delay }) => (
    <div className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-blue-50 animate-fade-in-up ${delay || ""}`}>
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-sky-500 rounded-xl flex items-center justify-center mb-6 shadow-blue-200 shadow-lg">
            <i className={`fas ${icon} text-2xl text-white`}></i>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">{title}</h3>
        <p className="text-slate-600 leading-relaxed mb-6">{children}</p>
        {items && items.length > 0 && (
            <ul className="space-y-3 border-t border-slate-100 pt-6">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm font-medium text-slate-500">
                        <i className="fas fa-check-circle text-sky-500 mr-3"></i>
                        {item}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

// Future Feature Card Component
const FutureFeatureCard = ({ icon, title, description }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-dashed border-blue-100 hover:border-blue-300 hover:bg-white transition-all duration-300 group">
        <div className="flex items-start mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-sky-50 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <i className={`fas ${icon} text-lg text-blue-500`}></i>
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            </div>
        </div>
        <p className="text-slate-600">{description}</p>
    </div>
);

export default function Home() {
    return (
        <div className="min-h-screen bg-[#f8faff] selection:bg-blue-100 selection:text-blue-700">
            <Header />

            <main className="container mx-auto px-6 py-12 lg:py-20">

                {/* --- Hero Section --- */}
                <section className="relative rounded-3xl mb-20 overflow-hidden shadow-2xl shadow-blue-100 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500"></div>
                    <div
                        className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-overlay transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${typingBg})` }}
                    ></div>

                    <div className="relative z-10 text-white text-center py-20 px-6 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                            Learn to Type <br />
                            <span className="text-sky-200">Fast and Accurately.</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-10 text-blue-50 opacity-90 leading-relaxed">
                            Practice typing at your own pace, improve speed and accuracy, and boost your confidence.
                            Perfect for students and beginners learning keyboard skills.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <Link to="/practice" className="bg-white text-blue-600 font-bold px-10 py-4 rounded-full hover:bg-blue-50 transition-all shadow-lg active:scale-95">
                                Start Practicing
                            </Link>
                            <Link to="/lessons" className="bg-blue-500/20 backdrop-blur-md border border-white/30 text-white font-bold px-10 py-4 rounded-full hover:bg-white/20 transition-all active:scale-95">
                                View Lessons
                            </Link>
                        </div>
                    </div>
                </section>

                {/* --- Why Choose Section --- */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Why Choose TypeACCI?
                        </h2>
                        <div className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full mb-6"></div>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            A friendly typing platform designed to help students and beginners type faster,
                            make fewer mistakes, and improve confidence while learning.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <FeatureCard
                            icon="fa-bolt"
                            title="Speed Practice"
                            items={["See your typing speed in real-time", "Challenges that adapt as you improve"]}
                        >
                            Fun exercises to help you type faster step by step and improve your words-per-minute gradually.
                        </FeatureCard>

                        <FeatureCard
                            icon="fa-bullseye"
                            title="Accuracy Training"
                            delay="delay-150"
                            items={["Spot mistakes instantly", "Build muscle memory"]}
                        >
                            Simple drills to reduce errors and help you type accurately without looking at the keyboard.
                        </FeatureCard>

                        <FeatureCard
                            icon="fa-chart-line"
                            title="Progress Reports"
                            delay="delay-300"
                            items={["Track improvements over time", "Compare with peers"]}
                        >
                            Easy-to-read reports that show your growth, strengths, and areas to improve as you practice.
                        </FeatureCard>
                    </div>
                </section>

                {/* --- Tools Section --- */}
                <section className="py-20 px-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                                Everything you need to <br />
                                <span className="text-blue-600">Type Like a Pro.</span>
                            </h2>
                            <p className="text-slate-600 text-lg mb-8">
                                Easy-to-use tools designed to help students and beginners learn and practice typing skills effectively.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: 'fa-keyboard', title: 'Multiple Lessons' },
                                { icon: 'fa-gamepad', title: 'Typing Content' },
                                { icon: 'fa-file-alt', title: 'Real Texts' },
                                { icon: 'fa-medal', title: 'Skill Development' },
                            ].map((f, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                                    <i className={`fas ${f.icon} text-blue-500 mb-3 text-xl`}></i>
                                    <h4 className="font-bold text-slate-800">{f.title}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Future Features Section --- */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-sky-50 border border-blue-200 mb-6">
                            <i className="fas fa-rocket text-blue-500 mr-2"></i>
                            <span className="font-bold text-blue-600">Coming Soon</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Exciting Features in Development
                        </h2>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-blue-400 to-sky-400 mx-auto rounded-full mb-6"></div>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            We're constantly improving to bring the best typing experience for students and beginners. Here's what's coming next.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FutureFeatureCard
                            icon="fa-language"
                            title="Kruti Dev Fonts"
                            description="Type in Kruti Dev effortlessly with full keyboard support and accurate font rendering for Hindi typing."
                        />
                        <FutureFeatureCard
                            icon="fa-gamepad"
                            title="Typing Games"
                            description="Engaging typing games to improve speed and accuracy while making learning fun."
                        />
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
