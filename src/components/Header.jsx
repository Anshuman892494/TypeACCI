import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b border-blue-100">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex items-center gap-2.5">
                            <i className="fas fa-keyboard text-2xl text-blue-600"></i>
                            <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent hover:from-sky-600 hover:to-blue-600 transition-all duration-300">
                                TypeACCI
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:block">
                            <ul className="flex items-center gap-4 lg:gap-6">
                                <li>
                                    <Link to="/" className="font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-300">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/practice" className="font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-300">
                                        <i className="fas fa-keyboard mr-2 text-blue-500"></i>
                                        Practice
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/lessons" className="font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-300">
                                        <i className="fas fa-graduation-cap mr-2 text-blue-500"></i>
                                        Lessons
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/upcoming" className="font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-300">
                                        <i className="fas fa-calendar-alt  mr-2 text-blue-500"></i>
                                        Upcomping
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-300">
                                        <i className="fas fa-user mr-2 text-blue-500"></i>
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-blue-600 hover:text-sky-500 transition-colors duration-300"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                        </button>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden border-t border-blue-100 mt-2 pt-4 pb-6 bg-blue-50/50 rounded-lg animate-fade-in">
                            <ul className="flex flex-col gap-2">
                                <li>
                                    <Link
                                        to="/"
                                        className="block font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-3 rounded-lg transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <i className="fas fa-home mr-3 text-blue-500"></i>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/practice"
                                        className="block font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-3 rounded-lg transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <i className="fas fa-keyboard mr-3 text-blue-500"></i>
                                        Practice
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/lessons"
                                        className="block font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-100 px-4 py-3 rounded-lg transition-all duration-300"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <i className="fas fa-graduation-cap mr-3 text-blue-500"></i>
                                        Lessons
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}