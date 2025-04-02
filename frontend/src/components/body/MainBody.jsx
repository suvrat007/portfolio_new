import Text from "./Text.jsx";
import Image from "./Image.jsx";

const MainBody = () =>{
    return (
        <div className="w-full flex flex-row justify-center items-center mt-[10%] min-h-[30em] border-2 ">
            <Text/>
            <Image/>
        </div>
    )
}
export default MainBody;