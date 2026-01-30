import Header from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WordKey() {
    const navigate = useNavigate();

    // ---------- Split story into lines (max 30 characters each) ----------
    function generateStoryLines() {
        const story = `
    India, officially known as the Republic of India, is a vast and vibrant country located in South Asia. It is the seventh-largest country in the world by land area and the second-most populous, with over 1.4 billion people. India shares its borders with Pakistan, China, Nepal, Bhutan, Bangladesh, and Myanmar, and is surrounded by the Indian Ocean to the south.

India is known for its cultural diversity, with thousands of languages, religions, and traditions coexisting harmoniously. Hindi and English are the official languages, but the constitution recognizes 22 scheduled languages. Major religions like Hinduism, Islam, Christianity, Sikhism, Buddhism, and Jainism originated or have a significant presence in India, making it a land of spiritual richness.

Historically, India has a glorious heritage. Ancient civilizations, like the Indus Valley Civilization, date back over 5,000 years. India has been home to many dynasties, empires, and scholars who contributed to art, science, mathematics, and philosophy. The country also has a rich legacy of festivals, music, dance, and cuisine that varies across regions.

India gained independence from British rule on 15th August 1947 under the leadership of Mahatma Gandhi, whose principles of non-violence and truth inspired millions. The country adopted a democratic constitution in 1950, becoming the largest democracy in the world.

Economically, India is a fast-growing nation, with major industries including agriculture, information technology, manufacturing, and services. Cities like Mumbai, Delhi, Bengaluru, and Hyderabad are hubs of trade, technology, and culture.

Tourism in India is also remarkable, with sites like the Taj Mahal, Jaipur palaces, Kerala backwaters, and Himalayan landscapes attracting visitors globally. Despite challenges such as poverty and environmental concerns, India continues to progress steadily, reflecting resilience, unity, and diversity.

In essence, India is a land of contrasts—ancient and modern, traditional and innovative—making it a unique and inspiring country on the global stage
`;

        const words = story.trim().replace(/\n/g, " ").split(/\s+/);
        const lines = [];
        let currentLine = "";

        for (let word of words) {
            if ((currentLine + " " + word).trim().length <= 30) {
                currentLine = (currentLine + " " + word).trim();
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        if (currentLine) lines.push(currentLine);

        return lines;
    }

    // ---------- Lesson object ----------
    const lesson = {
        title: "Word Practice",
        practiceTexts: generateStoryLines(),
    };

    const VISIBLE_LINES = 5;

    const [lineIndex, setLineIndex] = useState(0);
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [totalCorrectChars, setTotalCorrectChars] = useState(0);
    const [totalTypedChars, setTotalTypedChars] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const inputRef = useRef(null);
    const lines = lesson.practiceTexts;
    const currentLine = lines[lineIndex] || "";

    useEffect(() => {
        inputRef.current?.focus();
    }, [lineIndex, isFinished]);

    // ---------- Handle typing ----------
    const handleInput = (e) => {
        const val = e.target.value;

        if (!startTime && val.length === 1) setStartTime(Date.now());

        if (currentLine && val.length <= currentLine.length) setInput(val);

        // Move to next line or finish lesson
        if (currentLine && val.length === currentLine.length) {
            // Count correct chars for this line
            let correct = 0;
            for (let i = 0; i < val.length; i++) {
                if (val[i] === currentLine[i]) correct++;
            }

            setTotalCorrectChars(prev => prev + correct);
            setTotalTypedChars(prev => prev + val.length);

            setTimeout(() => {
                const nextLine = lineIndex + 1;
                if (nextLine >= lines.length) {
                    setIsFinished(true);
                } else {
                    setLineIndex(nextLine);
                }
                setInput("");
            }, 300);
        }
    };

    // ---------- Calculate WPM & Accuracy ----------
    useEffect(() => {
        if (!startTime) return;
        const interval = setInterval(() => {
            const minutes = (Date.now() - startTime) / 60000;
            const wordsTyped = totalCorrectChars / 5;
            setWpm(minutes > 0 ? Math.round(wordsTyped / minutes) : 0);
            setAccuracy(totalTypedChars ? Math.round((totalCorrectChars / totalTypedChars) * 100) : 100);
        }, 200);
        return () => clearInterval(interval);
    }, [startTime, totalCorrectChars, totalTypedChars]);

    const handleContinuePractice = (action) => {
        if (action === "same") {
            setLineIndex(0);
            setIsFinished(false);
            setInput("");
            setStartTime(null);
            setTotalCorrectChars(0);
            setTotalTypedChars(0);
            setWpm(0);
            setAccuracy(100);
        } else {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-gray-800">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-blue-900 mb-3 border-b-2 border-blue-900 inline-block pb-2">
                        {lesson.title}
                    </h1>
                </div>

                <div className="grid grid-cols-3 gap-5 mb-10 max-w-xl mx-auto">
                    <Stat label="WPM" value={wpm} />
                    <Stat label="Accuracy" value={`${accuracy}%`} />
                    <Stat label="Line" value={`${lineIndex + 1} / ${lines.length}`} />
                </div>

                {!isFinished && (
                    <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-200 mb-12 min-h-[300px] relative">
                        <div className="space-y-5 font-mono text-2xl leading-snug select-none">
                            {Array.from({ length: VISIBLE_LINES }).map((_, offset) => {
                                const line = lines[lineIndex + offset];
                                const isActive = offset === 0;

                                return (
                                    <div key={lineIndex + offset} className="flex justify-center gap-2 min-h-[4rem]">
                                        {line ? line.split("").map((char, i) => {
                                            const isTyped = isActive && i < input.length;
                                            const isCorrect = isTyped && input[i] === char;
                                            const isCursor = isActive && i === input.length;

                                            return (
                                                <div key={i}
                                                    className={`relative flex items-center justify-center w-10 h-14 rounded-lg transition-colors duration-150
                                                        ${isTyped
                                                            ? isCorrect
                                                                ? "bg-emerald-100 text-emerald-700"
                                                                : "bg-rose-500 text-white"
                                                            : "bg-gray-100 text-gray-400"
                                                        }`}
                                                >
                                                    {char}
                                                    {isCursor && (
                                                        <span className="absolute bottom-1 w-8 h-1 bg-blue-500 rounded-full animate-pulse" />
                                                    )}
                                                </div>
                                            );
                                        }) : <div className="h-14" />}
                                    </div>
                                );
                            })}
                        </div>

                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={handleInput}
                            className="absolute inset-0 w-full h-full opacity-0"
                            autoFocus
                        />
                    </div>
                )}

                {isFinished && (
                    <div className="text-center">
                        <div className="inline-block bg-emerald-500 text-white px-12 py-6 rounded-2xl shadow-lg mb-6">
                            <h2 className="text-3xl font-bold mb-2">🎉 Lesson Completed!</h2>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => handleContinuePractice("same")}
                                className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-md hover:bg-blue-700 active:scale-95 transition"
                            >
                                Continue Same Text
                            </button>
                            <button
                                onClick={() => handleContinuePractice("next")}
                                className="px-8 py-4 rounded-xl bg-green-600 text-white font-bold text-lg shadow-md hover:bg-green-700 active:scale-95 transition"
                            >
                                Next Text
                            </button>
                            <button
                                onClick={() => handleContinuePractice("home")}
                                className="px-8 py-4 rounded-xl bg-gray-600 text-white font-bold text-lg shadow-md hover:bg-gray-700 active:scale-95 transition"
                            >
                                Home
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

/* ---------- Helper Component ---------- */
function Stat({ label, value }) {
    return (
        <div className="bg-blue-900 text-white p-4 rounded-xl shadow text-center">
            <div className="text-xs uppercase opacity-70">{label}</div>
            <div className="text-2xl font-black font-mono">{value}</div>
        </div>
    );
}
