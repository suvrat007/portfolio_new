import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const FollowLinks = () => {
    return (
        <footer className="w-full flex flex-col items-center text-gray-400 mt-10 pb-6">
            {/* Follow Me Section */}
            <div className="w-[80%] max-w-4xl flex items-center justify-between 
                            bg-[#131313] rounded-full py-4 px-6">
                <h1 className="text-lg">Follow me</h1>

                <div className="flex gap-4 text-purple-400">
                    <a href="https://github.com/suvrat007" target="_blank" rel="noopener noreferrer">
                        <FaGithub size={22} />
                    </a>
                    <a href="https://www.linkedin.com/in/suvrat-mittal-05b642294/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin size={22} />
                    </a>
                    <a href="mailto:youremail@example.com">
                        <FaEnvelope size={22} />
                    </a>
                </div>
            </div>

            {/* Copyright Text */}
            <p className="mt-4 text-sm">suvrat007 © 2024</p>
        </footer>
    );
};

export default FollowLinks;
