const Image = () => {
    return (
        <div className="w-full md:w-[40%] flex justify-center items-center">
            <div className="w-[70%] h-[70%] sm:w-56 sm:h-56 mb-10 md:w-64 md:h-64 rounded-xl md:rounded-full overflow-hidden
                            border-4 border-purple-500
                            shadow-[0_0_15px_rgba(192,132,252,0.5),0_0_25px_rgba(192,132,252,0.4),0_0_35px_rgba(192,132,252,0.3)]
                            hover:shadow-[0_0_25px_rgba(192,132,252,0.7),0_0_35px_rgba(192,132,252,0.6),0_0_45px_rgba(192,132,252,0.5)]
                            transition-all hover:scale-105 duration-300">
                <img
                    src="https://i.ibb.co/w5969Jt/Whats-App-Image-2025-03-29-at-22-55-08-82521ab9.jpg"
                    alt="Suvrat"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default Image;
