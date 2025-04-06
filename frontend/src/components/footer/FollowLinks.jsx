import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const FollowLinks = () => {
    return (
        <footer className="w-full flex flex-col items-center text-gray-400 mt-16 pb-10 px-4">
            <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between
                            bg-[#1a1a1a]/70 backdrop-blur-sm rounded-full py-4 px-6 shadow-lg">

                <h1 className="text-base sm:text-lg font-medium mb-4 md:mb-0 text-xl mb:text-sm">Follow Me</h1>

                <div className="flex gap-6 text-purple-400">
                    <a
                        href="https://github.com/suvrat007"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="hover:text-purple-500 transition duration-300"
                    >
                        <FaGithub size={22} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/suvrat-mittal-05b642294/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-purple-500 transition duration-300"
                    >
                        <FaLinkedin size={22} />
                    </a>
                    <a
                        href="mailto:youremail@example.com"
                        aria-label="Email"
                        className="hover:text-purple-500 transition duration-300"
                    >
                        <FaEnvelope size={22} />
                    </a>
                </div>
            </div>
            <p className="mt-6 text-xs sm:text-sm text-gray-500">© 2024 suvrat007. All rights reserved.</p>
        </footer>
    );
};

export default FollowLinks;
