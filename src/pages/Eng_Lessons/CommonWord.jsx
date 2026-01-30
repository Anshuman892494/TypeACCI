
import Header from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommonWord() {
    const navigate = useNavigate();

    function generateLessonPatterns() {
        const practiceTexts = [];

        const commonWords = [
            "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
            "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
            "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
            "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
            "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
            "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
            "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
            "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
            "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
            "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
        ];

        // 🔹 Level 1: 4 words per line
        for (let i = 0; i < commonWords.length; i += 4) {
            practiceTexts.push(commonWords.slice(i, i + 4).join(" "));
        }

        // 🔹 Level 2: Randomly shuffle words (harder)
        for (let i = 0; i < 10; i++) {
            let line = [];
            for (let j = 0; j < 4; j++) {
                line.push(commonWords[Math.floor(Math.random() * commonWords.length)]);
            }
            practiceTexts.push(line.join(" "));
        }

        // 🔹 Level 3: Mix 3 words + random letters
        const letters = "abcdefghijklmnopqrstuvwxyz".split("");
        for (let i = 0; i < 10; i++) {
            practiceTexts.push(
                `${commonWords[Math.floor(Math.random() * commonWords.length)]} ` +
                `${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]} ` +
                `${commonWords[Math.floor(Math.random() * commonWords.length)]}`
            );
        }

        return practiceTexts;
    }


    // Lesson object
    const lesson = {
        title: "Common Words Practice",
        practiceTexts: generateLessonPatterns()
    };

    console.log(lesson.practiceTexts);


    const VISIBLE_LINES = 5;

    const [lineIndex, setLineIndex] = useState(0);
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const inputRef = useRef(null);
    const lines = lesson.practiceTexts;
    const currentLine = lines[lineIndex] || "";

    useEffect(() => {
        inputRef.current?.focus();
    }, [lineIndex, isFinished]);

    const handleInput = (e) => {
        const val = e.target.value;

        if (!startTime && val.length === 1) {
            setStartTime(Date.now());
        }

        if (currentLine && val.length <= currentLine.length) {
            setInput(val);
            calculateStats(val);
        }

        // ✅ Move to next line or finish lesson
        if (currentLine && val.length === currentLine.length) {
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
    const calculateStats = (val) => {
        if (!startTime || !currentLine) return;

        // Count only correct characters (including spaces)
        let correct = 0;
        for (let i = 0; i < val.length; i++) {
            if (val[i] === currentLine[i]) correct++;
        }

        // Total minutes elapsed
        const minutes = (Date.now() - startTime) / 60000;

        // WPM = (correct characters / 5) / minutes
        const wordsTyped = correct / 5;

        setWpm(minutes > 0 ? Math.round(wordsTyped / minutes) : 0);

        // Accuracy = (correct chars / total typed chars) * 100
        setAccuracy(val.length ? Math.round((correct / val.length) * 100) : 100);
    };


    const handleContinuePractice = (action) => {
        if (action === "same") {
            setLineIndex(0);
            setIsFinished(false);
            setInput("");
            setStartTime(null);
            setWpm(0);
            setAccuracy(0);
        } else if (action === "next") {
            navigate("/");
        } else if (action === "home") {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-gray-800">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-10">
                {/* Title */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-blue-900 mb-3 border-b-2 border-blue-900 inline-block pb-2">
                        {lesson.title}
                    </h1>

                    <div className="flex justify-center mt-4">
                        <span className="px-10 py-2 bg-blue-100 text-blue-900 font-bold rounded-xl border border-blue-300 tracking-widest">
                            Random Words
                        </span>
                    </div>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-5 mb-10 max-w-xl mx-auto">
                    <Stat label="WPM" value={wpm} />
                    <Stat label="Accuracy" value={`${accuracy}%`} />
                    <Stat label="Line" value={`${lineIndex + 1} / ${lines.length}`} />
                </div>

                {/* Typing Area */}
                {!isFinished && (
                    <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-200 mb-12 min-h-[420px] relative">
                        <div className="space-y-5 font-mono text-[2.8rem] leading-snug select-none">
                            {Array.from({ length: VISIBLE_LINES }).map((_, offset) => {
                                const line = lines[lineIndex + offset];
                                const isActive = offset === 0;

                                return (
                                    <div key={lineIndex + offset} className="flex justify-center gap-2 min-h-[4.5rem]">
                                        {line ? line.split("").map((char, i) => {
                                            const isTyped = isActive && i < input.length;
                                            const isCorrect = isTyped && input[i] === char;
                                            const isCursor = isActive && i === input.length;

                                            return (
                                                <div key={i}
                                                    className={`relative flex items-center justify-center w-12 h-16 rounded-lg transition-colors duration-150
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
                                        }) : (
                                            <div className="h-16" />
                                        )}
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

                {/* Completion + Continue */}
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
