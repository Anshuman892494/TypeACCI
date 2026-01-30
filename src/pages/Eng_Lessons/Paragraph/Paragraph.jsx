import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";

export default function Paragraph() {
    const navigate = useNavigate();

    const paragraph = [

        { id: 1, title: "Mouse", link: "/mouse", difficulty: "100 Words" },
        { id: 2, title: "Keyboard", link: "/keyboard", difficulty: "150 Words" },
        { id: 3, title: "Input", link: "/input", difficulty: "200 Words" },
        { id: 4, title: "Output", link: "/output", difficulty: "250 Words" },
        { id: 5, title: "Hard Disk", link: "/hdd", difficulty: "300 Words" },
        { id: 6, title: "Computer", link: "/computer", difficulty: "350 Words" },
        { id: 7, title: "MotherBoard", link: "/motherboard", difficulty: "400 Words" },
    ];

    return (
        <div className="min-h-screen bg-sky-50">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Title */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
                        Paragraphs List
                    </h1>
                    <p className="text-blue-600">
                        Click any lesson to start from the beginning.
                    </p>
                </div>

                {/* paragraph Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paragraph.map((lesson) => (
                        <div
                            key={lesson.id}
                            onClick={() => navigate("/lessons/paragraph" + lesson.link)}
                            className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
                        >
                            <h3 className="text-xl font-bold text-blue-700 mb-2">
                                {lesson.title}
                            </h3>
                            {lesson.keys && (
                                <p className="text-blue-500 mb-1">{lesson.keys}</p>
                            )}
                            {lesson.difficulty && (
                                <p className="capitalize text-gray-500">{lesson.difficulty}</p>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
