import Header from "../../components/Header";
import ShortFooter from "../../components/ShortFooter";

import { Link } from "react-router-dom";

export default function NotFound404() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
            <Header />

            <main className="container mx-auto px-4 py-8 min-h-[70vh] flex flex-col items-center justify-center">
                {/* Error Content */}
                <div className="text-center max-w-3xl mx-auto">
                    {/* Animated Error Number */}
                    <div className="relative mb-8">
                        <div className="text-[180px] md:text-[240px] font-bold text-blue-100 leading-none">
                            404
                        </div>
                    </div>

                    {/* Error Message */}
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-lg text-blue-700 mb-8 max-w-2xl mx-auto">
                        Oops! The page you're looking for seems to have wandered off. <br />
                        It might have been moved, deleted, or perhaps never existed.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] border border-blue-200"
                        >
                            <i className="fas fa-arrow-left mr-2"></i>
                            Go Back
                        </button>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] shadow-md"
                        >
                            <i className="fas fa-home mr-2"></i>
                            Back to Home
                        </Link>
                    </div>

                </div>
            </main>

            <ShortFooter />
        </div>
    );
}