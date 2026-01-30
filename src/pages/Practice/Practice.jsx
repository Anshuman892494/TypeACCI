import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

export default function Practice() {
    const navigate = useNavigate();

    // Practice lessons
    const lessons = [
        {
            id: 1,
            title: "Key Practice",
            link: "/userkey",
            description: "Practice typing using your selected keys",
        },
        {
            id: 2,
            title: "Words Practice",
            link: "/wordkey",
            description: "Practice typing using random words",
        },
        {
            id: 3,
            title: "Paragraph Practice",
            link: "/parakey",
            description: "Practice typing using given paragraph",
        },
    ];

    return (
        <div className="min-h-screen bg-sky-50">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
                        Typing Practice
                    </h1>
                    <p className="text-blue-600 max-w-xl mx-auto">
                        Choose a practice lesson below to improve your typing skills. Focus on speed, accuracy, and fun!
                    </p>

                </div>

                {/* Practice Lessons Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            onClick={() => navigate("/practice" + lesson.link)}
                            className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
                        >
                            <h3 className="text-xl font-bold text-blue-700 mb-2">
                                {lesson.title}
                            </h3>
                            {lesson.description && (
                                <p className="text-gray-500">{lesson.description}</p>
                            )}
                            <span className="inline-block mt-4 bg-blue-50 p-2 rounded text-sm text-blue-600 font-medium">
                                Start Now
                            </span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
