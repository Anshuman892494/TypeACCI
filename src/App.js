import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";

// imports Rows Page
import BottomRow from "./pages/Eng_Lessons/BottomRow/BottomRow";
import BottomRowMed from "./pages/Eng_Lessons/BottomRow/BottomRowMed";
import BottomRowAd from "./pages/Eng_Lessons/BottomRow/BottomRowAd";
import TopRow from "./pages/Eng_Lessons/TopRow/TopRow";
import TopRowMed from "./pages/Eng_Lessons/TopRow/TopRowMed";
import TopRowAd from "./pages/Eng_Lessons/TopRow/TopRowAd";
import HomeRow from "./pages/Eng_Lessons/HomeRow/HomeRow";
import HomeRowMed from "./pages/Eng_Lessons/HomeRow/HomeRowMed";
import HomeRowAd from "./pages/Eng_Lessons/HomeRow/HomeRowAd";

// Lessons
import NumPad from "./pages/Eng_Lessons/NumPad";
import Lessons from "./pages/Eng_Lessons/Lessons";
import TypingFunda from "./pages/Eng_Lessons/TypingFunda";
import CapsFunda from "./pages/Eng_Lessons/CapsFunda";
import Symbols from "./pages/Eng_Lessons/Symbols";
import CommonWord from "./pages/Eng_Lessons/CommonWord";
import Paragraph from "./pages/Eng_Lessons/Paragraph/Paragraph";

// Paragraphs
import Computer from "./pages/Eng_Lessons/Paragraph/Computer";
import Input from "./pages/Eng_Lessons/Paragraph/Input";
import HardDisk from "./pages/Eng_Lessons/Paragraph/HardDisk";
import Output from "./pages/Eng_Lessons/Paragraph/Output";
import Keyboard from "./pages/Eng_Lessons/Paragraph/Keyboard";
import Mouse from "./pages/Eng_Lessons/Paragraph/Mouse";
import MotherBoard from "./pages/Eng_Lessons/Paragraph/MotherBoard";

// Practice
import Practice from "./pages/Practice/Practice";
import UserKey from "./pages/Practice/UserKey";
import WordKey from "./pages/Practice/WordKey";

// Others
import About from "./pages/other/About";
import Upcoming from "./pages/other/Upcoming";
import NotFound404 from "./pages/other/NotFound404";

// For all Cliparts and Fonts
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROOT ROUTE - Landing Page */}
        <Route path="/" element={<Home />} />

        {/* -------- TYPING PAGES -------- */}
        {/* <Route path="/practice" element={<Practice />} /> */}
        <Route path="/lessons" element={<Lessons />} />

        {/* -------- LESSONS PRACTICE PAGES -------- */}
        <Route path="/lessons/homerow" element={<HomeRow />} />
        <Route path="/lessons/homerow/medium" element={<HomeRowMed />} />
        <Route path="/lessons/homerow/advanced" element={<HomeRowAd />} />
        <Route path="/lessons/toprow" element={<TopRow />} />
        <Route path="/lessons/toprow/medium" element={<TopRowMed />} />
        <Route path="/lessons/toprow/advanced" element={<TopRowAd />} />
        <Route path="/lessons/bottomrow" element={<BottomRow />} />
        <Route path="/lessons/bottomrow/medium" element={<BottomRowMed />} />
        <Route path="/lessons/bottomrow/advanced" element={<BottomRowAd />} />

        {/* OTHER PRACTICE PAGES */}
        <Route path="/lessons/all-row" element={<TypingFunda />} />
        <Route path="/lessons/capital-all-row" element={<CapsFunda />} />
        <Route path="/lessons/number-pad" element={<NumPad />} />
        <Route path="/lessons/symbols" element={<Symbols />} />
        <Route path="/lessons/common-words" element={<CommonWord />} />
        <Route path="/lessons/paragraph" element={<Paragraph />} />

        {/* Paragraphs */}
        <Route path="/lessons/paragraph/computer" element={<Computer />} />
        <Route path="/lessons/paragraph/input" element={<Input />} />
        <Route path="/lessons/paragraph/output" element={<Output />} />
        <Route path="/lessons/paragraph/keyboard" element={<Keyboard />} />
        <Route path="/lessons/paragraph/mouse" element={<Mouse />} />
        <Route path="/lessons/paragraph/motherboard" element={<MotherBoard />} />
        <Route path="/lessons/paragraph/hdd" element={<HardDisk />} />

        {/* Practice */}
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice/userkey" element={<UserKey />} />
        <Route path="/practice/wordkey" element={<WordKey />} />
        <Route path="/practice/parakey" element={<Paragraph />} />

        {/* -------- PUBLIC (LEGAL / INFO) -------- */}
        <Route path="/about" element={<About />} />
        <Route path="/upcoming" element={<Upcoming />} />

        {/* -------- 404 FALLBACK -------- */}
        <Route path="*" element={<NotFound404 />} />

      </Routes>
    </BrowserRouter>
  );
}