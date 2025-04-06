import Text from "./Text.jsx";
import Image from "./Image.jsx";

const MainBody = () => {
    return (
        <div className="w-full flex flex-col-reverse md:flex-row justify-center items-center px-6 md:px-20 mt-10 min-h-[80vh]">
            <Text />
            <Image />
        </div>
    );
};

export default MainBody;
