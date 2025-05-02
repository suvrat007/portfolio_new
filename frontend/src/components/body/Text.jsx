const Text = () => {
    return (
        <div className="w-full md:w-[60%]  text-white flex flex-col items-start mb-12 md:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                Hi! I'm <span className="text-purple-500">Suvrat</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                I’m a <strong>MERN stack developer</strong> with a strong eye for design and a focus on performance.
                I build clean, responsive, and scalable web apps that don’t just work — they <span className="italic">impress</span>.
                With a modern tech stack and a love for problem-solving, I turn smart ideas into seamless digital experiences.
            </p>

            <a
                href="https://drive.google.com/file/d/1o8WVxAvruzlEAYkdF_wXOZsMM9ch_q0L/view?usp=sharing"
                className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-full shadow-md hover:bg-purple-700 transition duration-300"
            >
                Download Resume
            </a>
        </div>
    );
};

export default Text;
