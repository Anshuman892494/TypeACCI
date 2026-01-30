import Header from "../../components/Header";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function TypingFunda() {
    const navigate = useNavigate();

    // Wrap allKeys in useMemo to prevent recreation on every render
    const allKeys = useMemo(() => [
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "a", "s", "d", "f", "g", "h", "j", "k", "l", ";",
        "z", "x", "c", "v", "b", "n", "m", ",",
    ], []); // Empty dependency array means it's created once

    // State for selected keys
    const [selectedKeys, setSelectedKeys] = useState(["a", "s", "d", "f", "j", "k", "l", ";"]);
    const [isSelectingKeys, setIsSelectingKeys] = useState(true);

    // Track overall accuracy across all lines
    const [totalTyped, setTotalTyped] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [overallAccuracy, setOverallAccuracy] = useState(100);

    // Wrap generateLessonPatterns in useCallback
    const generateLessonPatterns = useCallback((keys) => {
        const practiceTexts = [];

        // Use the keys parameter, fallback to allKeys if no keys provided
        const keysToUse = keys && keys.length > 0 ? keys : allKeys;

        // 🔹 Single-letter patterns for each selected key
        keysToUse.forEach(key => {
            // 5 repetitions of single key
            practiceTexts.push(Array(5).fill(key).join(" "));
        });

        // 🔹 Pair patterns for consecutive keys
        for (let i = 0; i < keysToUse.length - 1; i++) {
            const line = [
                ...Array(5).fill(keysToUse[i]),       // 5 of current
                ...Array(5).fill(keysToUse[i + 1])    // 5 of next
            ];
            practiceTexts.push(line.join(" "));
        }

        // 🔹 Two-key alternation (10 letters each)
        for (let i = 0; i < keysToUse.length - 1; i++) {
            const pair = [keysToUse[i], keysToUse[i + 1]];
            let line = [];
            for (let k = 0; k < 5; k++) line.push(...pair);
            practiceTexts.push(line.join(" "));
        }

        // 🔹 Random combinations of selected keys
        for (let i = 0; i < 10; i++) {
            let line = [];
            for (let j = 0; j < 10; j++) {
                const randomKey = keysToUse[Math.floor(Math.random() * keysToUse.length)];
                line.push(randomKey);
            }
            practiceTexts.push(line.join(" "));
        }

        // 🔹 Three-key patterns
        if (keysToUse.length >= 3) {
            for (let i = 0; i < keysToUse.length - 2; i++) {
                const pattern = [keysToUse[i], keysToUse[i + 1], keysToUse[i + 2]];
                let line = [];
                for (let k = 0; k < 4; k++) line.push(...pattern);
                line.push(pattern[0]); // Make it 13 characters total
                practiceTexts.push(line.join(" "));
            }
        }

        return practiceTexts;
    }, [allKeys]); // allKeys is now memoized, so this is stable

    const [lesson, setLesson] = useState({
        title: "Custom Key Practice",
        practiceTexts: generateLessonPatterns(selectedKeys)
    });

    const VISIBLE_LINES = 5;

    const [lineIndex, setLineIndex] = useState(0);
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [isFinished, setIsFinished] = useState(false);

    const inputRef = useRef(null);
    const lines = lesson.practiceTexts;
    const currentLine = lines[lineIndex] || "";

    useEffect(() => {
        inputRef.current?.focus();
    }, [lineIndex, isFinished, isSelectingKeys]);

    // Update lesson when selected keys change
    useEffect(() => {
        if (!isSelectingKeys) {
            setLesson({
                title: `Practice: ${selectedKeys.join(", ").toUpperCase()}`,
                practiceTexts: generateLessonPatterns(selectedKeys)
            });
            // Reset practice state
            setLineIndex(0);
            setInput("");
            setStartTime(null);
            setIsFinished(false);
            // Reset overall stats
            setTotalTyped(0);
            setTotalCorrect(0);
            setOverallAccuracy(0);
        }
    }, [selectedKeys, isSelectingKeys, generateLessonPatterns]);

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
            }, 100);
        }
    };

    const calculateStats = (val) => {
        if (!currentLine) return;

        let correct = 0;
        for (let i = 0; i < val.length; i++) {
            if (val[i] === currentLine[i]) correct++;
        }

        // Update overall statistics
        const newTotalTyped = totalTyped + val.length;
        const newTotalCorrect = totalCorrect + correct;

        setTotalTyped(newTotalTyped);
        setTotalCorrect(newTotalCorrect);

        // Calculate overall accuracy
        const newAccuracy = newTotalTyped > 0
            ? Math.round((newTotalCorrect / newTotalTyped) * 100)
            : 100;
        setOverallAccuracy(newAccuracy);
    };

    const handleContinuePractice = (action) => {
        if (action === "same") {
            setLineIndex(0);
            setIsFinished(false);
            setInput("");
            setStartTime(null);
            // Reset overall stats
            setTotalTyped(0);
            setTotalCorrect(0);
            setOverallAccuracy(100);
        } else if (action === "next") {
            // Regenerate with same keys
            setLesson({
                title: `Practice: ${selectedKeys.join(", ").toUpperCase()}`,
                practiceTexts: generateLessonPatterns(selectedKeys)
            });
            setLineIndex(0);
            setIsFinished(false);
            setInput("");
            setStartTime(null);
            // Reset overall stats
            setTotalTyped(0);
            setTotalCorrect(0);
            setOverallAccuracy(100);
        } else if (action === "home") {
            navigate("/");
        } else if (action === "change_keys") {
            setIsSelectingKeys(true);
            setIsFinished(false);
        }
    };

    const toggleKey = (key) => {
        if (selectedKeys.includes(key)) {
            setSelectedKeys(selectedKeys.filter(k => k !== key));
        } else {
            setSelectedKeys([...selectedKeys, key]);
        }
    };

    const selectAllKeys = () => {
        setSelectedKeys([...allKeys]);
    };

    const clearSelection = () => {
        setSelectedKeys([]);
    };

    const startPractice = () => {
        if (selectedKeys.length === 0) {
            alert("Please select at least one key to practice!");
            return;
        }
        setIsSelectingKeys(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-gray-800">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-10">
                {/* Title */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-blue-900 mb-3 border-b-2 border-blue-900 inline-block pb-2">
                        {isSelectingKeys ? "Select Keys to Practice" : lesson.title}
                    </h1>

                    {/* Key indicator when practicing */}
                    {!isSelectingKeys && (
                        <div className="flex justify-center mt-4">
                            <span className="px-6 py-2 bg-blue-100 text-blue-900 font-bold rounded-xl border border-blue-300 tracking-widest">
                                {selectedKeys.map(k => k.toUpperCase()).join(" ")}
                            </span>
                        </div>
                    )}
                </div>

                {/* Key Selection Section */}
                {isSelectingKeys && (
                    <div className="bg-white shadow-xl rounded-2xl p-8 mb-8 border border-gray-200">
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-blue-900">
                                    Select Keys ({selectedKeys.length} selected)
                                </h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={selectAllKeys}
                                        className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 border border-blue-300 transition"
                                    >
                                        Select All
                                    </button>
                                    <button
                                        onClick={clearSelection}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-300 transition"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Click on keys to select/deselect. Only selected keys will appear in the practice.
                            </p>
                        </div>

                        {/* Keyboard Layout */}
                        <div className="mb-8">
                            <div className="grid grid-cols-10 gap-3 justify-center max-w-2xl mx-auto">
                                {allKeys.map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => toggleKey(key)}
                                        className={`
                                            w-14 h-14 rounded-lg flex items-center justify-center text-xl font-bold
                                            transition-colors duration-150 hover:scale-105 active:scale-95
                                            ${selectedKeys.includes(key)
                                                ? "bg-blue-600 text-white shadow-lg"
                                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                            }
                                        `}
                                    >
                                        {key.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selected Keys Preview */}
                        <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
                            <h3 className="text-lg font-bold text-blue-900 mb-3">Selected Keys Preview:</h3>
                            <div className="flex flex-wrap gap-3 min-h-[3rem]">
                                {selectedKeys.length > 0 ? (
                                    selectedKeys.map(key => (
                                        <div
                                            key={key}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold shadow"
                                        >
                                            {key.toUpperCase()}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No keys selected yet</p>
                                )}
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={startPractice}
                                disabled={selectedKeys.length === 0}
                                className={`
                                    px-10 py-4 rounded-xl font-bold text-lg shadow-md
                                    transition-colors duration-150 hover:scale-105 active:scale-95
                                    ${selectedKeys.length === 0
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                    }
                                `}
                            >
                                Start Practice with Selected Keys
                            </button>
                        </div>
                    </div>
                )}

                {/* Stats - Only show when practicing */}
                {!isSelectingKeys && !isFinished && (
                    <div className="grid grid-cols-3 gap-5 mb-8 max-w-2xl mx-auto">
                        <Stat label="Accuracy" value={`${overallAccuracy}%`} />
                        <Stat label="Line" value={`${lineIndex + 1} / ${lines.length}`} />
                        <Stat label="Keys" value={selectedKeys.length} />
                    </div>
                )}

                {/* Typing Area - Only show when practicing */}
                {!isSelectingKeys && !isFinished && (
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
                {!isSelectingKeys && isFinished && (
                    <div className="text-center">
                        <div className="inline-block bg-emerald-500 text-white px-12 py-8 rounded-2xl shadow-lg mb-8">
                            <h2 className="text-3xl font-bold mb-2">🎉 Lesson Completed!</h2>
                            <p className="text-lg opacity-90">
                                You practiced with {selectedKeys.length} keys: {selectedKeys.map(k => k.toUpperCase()).join(", ")}
                            </p>
                            <div className="mt-4 flex justify-center gap-6">
                                <div className="text-center">
                                    <div className="text-sm opacity-80">Final Accuracy</div>
                                    <div className="text-2xl font-bold">{overallAccuracy}%</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm opacity-80">Lines Completed</div>
                                    <div className="text-2xl font-bold">{lines.length}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm opacity-80">Total Characters</div>
                                    <div className="text-2xl font-bold">{totalTyped}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => handleContinuePractice("same")}
                                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-md hover:bg-blue-700 active:scale-95 transition"
                            >
                                Repeat Same Text
                            </button>
                            <button
                                onClick={() => handleContinuePractice("next")}
                                className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold shadow-md hover:bg-green-700 active:scale-95 transition"
                            >
                                New Text (Same Keys)
                            </button>
                            <button
                                onClick={() => handleContinuePractice("change_keys")}
                                className="px-6 py-3 rounded-xl bg-blue-900 text-white font-bold shadow-md hover:bg-blue-800 active:scale-95 transition"
                            >
                                Change Keys
                            </button>
                            <button
                                onClick={() => handleContinuePractice("home")}
                                className="px-6 py-3 rounded-xl bg-gray-600 text-white font-bold shadow-md hover:bg-gray-700 active:scale-95 transition"
                            >
                                Home
                            </button>
                        </div>
                    </div>
                )}

                {/* Quick Stats when selecting */}
                {isSelectingKeys && selectedKeys.length > 0 && (
                    <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                        <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
                            Practice Preview
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                                <div className="text-sm text-blue-800">Patterns Generated</div>
                                <div className="text-2xl font-bold text-blue-900">
                                    {generateLessonPatterns(selectedKeys).length}
                                </div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                                <div className="text-sm text-blue-800">Keys Selected</div>
                                <div className="text-2xl font-bold text-blue-900">{selectedKeys.length}</div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                                <div className="text-sm text-blue-800">Focus Area</div>
                                <div className="text-lg font-bold text-blue-900">
                                    {selectedKeys.length <= 8 ? "Targeted" : "Comprehensive"}
                                </div>
                            </div>
                            <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                                <div className="text-sm text-blue-800">Estimated Time</div>
                                <div className="text-lg font-bold text-blue-900">
                                    {Math.ceil(generateLessonPatterns(selectedKeys).length * 0.5)} mins
                                </div>
                            </div>
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