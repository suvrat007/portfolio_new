const Text = () => {
    return (
        <div className="w-full md:w-[60%] p-10 text-white flex flex-col items-start mb-10">
            <h1 className="text-6xl font-bold leading-tight">Hi! I'm Suvrat</h1>

            <p className="mt-6 text-lg text-gray-300">
                I’m a MERN stack developer with a strong eye for design and a focus on performance.
                I build clean, responsive, and scalable web apps that don’t just work — they impress.
                With a strong foundation in modern tech and a passion for problem-solving,
                I’m here to turn smart ideas into seamless digital experiences.
            </p>

            <a href="https://drive.google.com/file/d/1R0XdSensp2eA8QgwDhGcI_gQxAOpGYWK/view?usp=sharing"
               target="_blank" rel="noopener noreferrer"
               className="mt-6 px-6 py-3 bg-purple-500 text-white text-lg font-semibold
                          rounded-full shadow-lg hover:bg-purple-600 transition-all
                          duration-300 ease-in-out">
                Download Resume
            </a>
        </div>
    );
};

export default Text;
