import Header from "../../../components/Header";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Computer() {
    const navigate = useNavigate();

    // ---------- Split story into lines (max 30 characters each) ----------
    function generateStoryLines() {
        const story = `
    A computer is an electronic device that can process data and perform tasks according to a set of instructions called programs. It is capable of accepting input, processing data, storing information, and producing output. Computers are widely used in homes, schools, offices, industries, and research for various purposes, including calculations, data management, communication, learning, and entertainment.

The main components of a computer include hardware and software. Hardware refers to the physical parts of a computer, such as the Central Processing Unit (CPU), memory (RAM and ROM), storage devices, and input/output devices. The CPU acts as the brain of the computer, controlling all operations and performing calculations. Memory stores data temporarily or permanently depending on its type, and input/output devices allow communication between the computer and the user.

Software refers to the programs that tell the computer how to perform specific tasks. It includes system software, like operating systems, which manage computer resources, and application software, such as word processors, spreadsheets, and multimedia applications.

Computers can be classified into different types based on size and usage. Supercomputers are used for complex scientific calculations, mainframes for large-scale data processing, personal computers (PCs) for everyday use, and laptops and tablets for portable computing.

The advantages of computers include speed, accuracy, storage capacity, and multitasking abilities. They can process large amounts of data quickly and provide reliable results. Computers have become an integral part of modern life, making communication, education, business, and entertainment more efficient.

In short, a computer is a versatile and powerful tool that helps humans perform tasks easily and accurately. Its combination of hardware and software makes it a complete system capable of handling a wide range of activities, from basic calculations to advanced simulations, transforming the way we live and work.
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
        title: "What is Computer?",
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
