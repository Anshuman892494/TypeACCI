export default function ShortFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            {/* Footer */}
            <footer className="bg-gradient-to-br from-blue-900 to-sky-900 text-white mt-12 py-10">
                <div className="flex flex-col items-center text-center">
                    {/* Copyright */}
                    <div className="w-full max-w-2xl">
                        <p className="text-blue-300">&copy; {currentYear} TypeACCI</p>
                        <p className="text-blue-300">
                            All rights reserved • Advance Computer Career Institute • Version 1.0.0
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}