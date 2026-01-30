import Header from "../../components/Header";
import Footer from "../../components/Footer";
import profile1 from "../../assets/anshu_im.jpeg";
import profile2 from "../../assets/acci.jpeg";
// import more profile images if needed

export default function About() {

    const values = [
        { icon: "fa-keyboard", title: "Skill Building", description: "Helping students develop strong typing and computer skills" },
        { icon: "fa-chart-line", title: "Daily Improvement", description: "Encouraging learners to improve a little every day" },
        { icon: "fa-users", title: "Student Support", description: "Creating a friendly and supportive learning environment" },
        { icon: "fa-bolt", title: "Speed Practice", description: "Helping students increase typing speed through regular practice" },
        { icon: "fa-bullseye", title: "Accuracy Focus", description: "Teaching correct finger placement and reducing typing mistakes" },
        { icon: "fa-graduation-cap", title: "Education First", description: "Making typing and computer education easy and accessible" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
            <Header />

            <main className="container mx-auto px-4 py-10">
                <div className="max-w-6xl mx-auto animate-fade-in">

                    {/* ---------- Hero Section ---------- */}
                    <div className="text-center mb-14">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <i className="fas fa-keyboard text-white text-3xl"></i>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-4">
                            About TypeACCI
                        </h1>
                        <p className="text-xl text-blue-700 max-w-2xl mx-auto">
                            A student-friendly typing platform by <br /> <strong>Advance Computer Career Institute</strong><br />
                            designed to help beginners learn typing with confidence.
                        </p>
                    </div>

                    {/* ---------- Mission Section ---------- */}
                    <div className="bg-gradient-to-r from-blue-500 to-sky-600 rounded-2xl p-8 md:p-12 text-white mb-14 shadow-xl">
                        <div className="max-w-3xl mx-auto text-center">
                            <i className="fas fa-bullseye text-3xl mb-4 text-white/80"></i>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="text-lg md:text-xl opacity-90">
                                Our mission is to help students and beginners learn typing easily through simple,
                                interactive, and effective practice.
                                <br /><br />
                                We believe typing is a basic skill for studies, competitive exams, and future careers.
                                TypeACCI helps learners improve speed, accuracy, and confidence step by step.
                            </p>
                        </div>
                    </div>

                    {/* ---------- Core Values ---------- */}
                    <div className="mb-14">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-10 text-center">
                            Our Core Values
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-lg flex items-center justify-center mb-4">
                                        <i className={`fas ${value.icon} text-white text-xl`}></i>
                                    </div>
                                    <h3 className="text-lg font-semibold text-blue-800 mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-blue-600">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ---------- Developer / Institute Section ---------- */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-14 border border-blue-100">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-10 text-center">
                            Meet the Team
                        </h2>

                        <div className="flex flex-wrap justify-center gap-10">

                            {/* ---------- Profile 1 ---------- */}
                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className="w-40 h-40 border-2 border-blue-500 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full mx-auto flex items-center justify-center shadow-xl overflow-hidden">
                                        <img
                                            src={profile2}
                                            alt="Acci Team Member"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-3">
                                        <a href="https://www.instagram.com/accicomputer" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-all hover:scale-110">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-blue-800 mb-1">ACCI</h3>
                                <p className="text-blue-600 font-medium mb-3">Advance Computer <br /> Carrer Institute</p>
                            </div>

                            {/* ---------- Anshuman Profile ---------- */}
                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className="w-40 h-40 border-2 border-blue-500 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full mx-auto flex items-center justify-center shadow-xl overflow-hidden">
                                        <img
                                            src={profile1}
                                            alt="Anshuman Varma"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-3">
                                        <a href="https://www.linkedin.com/in/anshuman-varma-0586b3337/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-all hover:scale-110">
                                            <i className="fab fa-linkedin"></i>
                                        </a>
                                        <a href="https://github.com/Anshuman892494" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-all hover:scale-110">
                                            <i className="fab fa-github"></i>
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-blue-800 mb-1">Anshuman Varma</h3>
                                <p className="text-blue-600 font-medium mb-3">TypeACCI</p>
                            </div>

                            {/* Add more profiles manually here */}

                        </div>
                    </div>



                </div>
            </main>

            <Footer />
        </div>
    );
}
