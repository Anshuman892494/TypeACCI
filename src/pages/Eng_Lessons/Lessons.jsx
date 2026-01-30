import Header from "../../components/Header";
import ShortFooter from "../../components/ShortFooter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Lessons() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", name: "All Lessons" },
        { id: "beginner", name: "Beginner" },
        { id: "intermediate", name: "Intermediate" },
        { id: "advanced", name: "Advanced" }
    ];

    // Lessons with the keys included
    const lessons = [
        { id: 1, title: "Home Row Basics", difficulty: "beginner", keys: "A S D F J K L ;", link: "/homerow" },
        { id: 2, title: "Home Row Medium", difficulty: "intermediate", keys: "A S D F J K L ;", link: "/homerow/medium" },
        { id: 3, title: "Home Row Advance", difficulty: "advanced", keys: "A S D F J K L ;", link: "/homerow/advanced" },

        { id: 4, title: "Top Row Basics", difficulty: "beginner", keys: "Q W E R U I O P", link: "/toprow" },
        { id: 5, title: "Top Row Medium", difficulty: "intermediate", keys: "Q W E R U I O P", link: "/toprow/medium" },
        { id: 6, title: "Top Row Advance", difficulty: "advanced", keys: "Q W E R U I O P", link: "/toprow/advanced" },

        { id: 7, title: "Bottom Row Basics", difficulty: "beginner", keys: "Z X C V B N M", link: "/bottomrow" },
        { id: 8, title: "Bottom Row Medium", difficulty: "intermediate", keys: "Z X C V B N M", link: "/bottomrow/medium" },
        { id: 9, title: "Bottom Row Advance", difficulty: "advanced", keys: "Z X C V B N M", link: "/bottomrow/advanced" },

        { id: 10, title: "Full Alphabet Drills", difficulty: "intermediate", keys: "All letters", link: "/all-row" },
        { id: 16, title: "Capital Letters & Shift", difficulty: "beginner", keys: "A-Z + Shift", link: "/capital-all-row" },
        { id: 12, title: "Number Pad Mastery", difficulty: "intermediate", keys: "0 1 2 3 4 5 6 7 8 9", link: "/number-pad" },
        { id: 14, title: "Speical Symbols", difficulty: "advanced", keys: "{ } [ ] ( ) & | ! @ #", link: "/symbols" },
        { id: 17, title: "Common Words Practice", difficulty: "intermediate", keys: "100 Most Common Words", link: "/common-words" },
        { id: 13, title: "Advanced Speed Training", difficulty: "advanced", keys: "Complex Paragraphs", link: "/paragraph" },
    ];


    // Filter lessons based on category & search
    const filteredLessons = lessons.filter(lesson => {
        const matchesCategory = activeCategory === "all" || lesson.difficulty === activeCategory;
        return matchesCategory;
    });

    return (
        <div className="min-h-screen bg-sky-50">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Title */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
                        Typing Lessons
                    </h1>
                    <p className="text-blue-600">
                        Click any lesson to start from the beginning.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-3 mb-8 justify-center">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-5 py-2 rounded-lg font-medium border ${activeCategory === category.id
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-blue-700 border-blue-200"
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Lessons Grid */}
                {filteredLessons.length === 0 ? (
                    <p className="text-center text-blue-500">No lessons found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredLessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                onClick={() => navigate("/lessons" + lesson.link)}
                                className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
                            >
                                <h3 className="text-xl font-bold text-blue-700 mb-2">
                                    {lesson.title}
                                </h3>
                                <p className="text-blue-500 mb-2">{lesson.keys}</p>
                                <p className="capitalize text-gray-500">{lesson.difficulty}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <ShortFooter />
        </div>
    );
}
