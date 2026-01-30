import Header from "../../components/Header";
import ShortFooter from "../../components/ShortFooter";
import { useNavigate } from "react-router-dom";

export default function Upcoming() {
    const navigate = useNavigate();
    const upcomingFeatures = [
        { id: 1, title: "Kruti Dev Typing", description: "Practice Hindi typing using the Kruti Dev keyboard layout" },
        { id: 2, title: "Typing Games", description: "Improve typing skills with fun and interactive games" },
        { id: 3, title: "Speed Test", description: "Test your typing speed, accuracy, and consistency" },
        { id: 4, title: "Exam Practice", description: "Typing practice based on government exam patterns" },
        { id: 5, title: "Mouse Practice", description: "Improve mouse control, speed, and clicking accuracy" },
    ];

    return (
        <div className="min-h-screen bg-sky-50">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Title */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-3">
                        Upcoming Features
                    </h1>
                    <p className="text-blue-600 max-w-xl mx-auto">
                        New features are coming soon to help students
                        improve typing skills.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingFeatures.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => navigate(item.link)}
                            className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 text-center border border-blue-100 hover:-translate-y-1"
                        >
                            <h3 className="text-xl font-bold text-blue-700 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {item.description}
                            </p>

                            <span className="inline-block mt-4 text-sm text-blue-600 font-medium">
                                Coming Soon
                            </span>
                        </div>
                    ))}
                </div>
            </main>

            <ShortFooter />
        </div>
    );
}
