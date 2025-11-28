import {BackgroundGradient} from "../ui/background-boxes.jsx";

const Image = () => {
    return (
        <div className="w-full md:w-[40%] flex justify-center items-center">
            {/* Wrap the image with BackgroundGradient */}
            <BackgroundGradient
                className="w-60 h-60 rounded-full overflow-hidden bg-gray-900" // Inner container for the image, dark background
                containerClassName="sm:w-60 sm:h-60 md:w-64 md:h-64 flex items-center justify-center p-[4px] hover:scale-105 transition-transform duration-300" // Outer container for gradient, slightly larger
            >
                <img
                    src="https://i.ibb.co/w5969Jt/Whats-App-Image-2025-03-29-at-22-55-08-82521ab9.jpg"
                    alt="Suvrat"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/400x400/333333/FFFFFF?text=Profile";
                    }}
                />
            </BackgroundGradient>
        </div>
    );
};

export default Image;