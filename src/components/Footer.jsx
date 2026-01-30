export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-blue-900 to-sky-900 text-white mt-12 py-10">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="flex flex-col items-center gap-6 text-center">

                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                            <i className="fas fa-keyboard text-white text-xl"></i>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
                            TypeACCI
                        </h1>
                    </div>

                    {/* Tagline */}
                    <p className="text-lg font-medium text-blue-100 max-w-2xl">
                        A student-friendly typing platform by ACCI
                    </p>

                    {/* Copyright */}
                    <div className="pt-6 mt-6 border-t border-blue-700/50 w-full max-w-2xl">
                        <p className="text-blue-300">
                            &copy; {currentYear} TypeACCI
                        </p>
                        <p className="text-blue-300 text-sm">
                            All rights reserved • Advance Computer Career Institute • Version 1.0.0
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
}
