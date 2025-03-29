import Domain from "./Domain.jsx";

const Technologies = ()=>{
    return (
        <div className="flex flex-col m-10 justify-between border-2 w-full p-10">
            <div className="text-4xl">
                <h1>Technologies I'm using</h1>
            </div>
            <div className="flex flex-row items-center gap-10 mt-10 justify-between ">
                <Domain/>
                <Domain/>
                <Domain/>
                <Domain/>
                <Domain/>
                
            </div>

        </div>
    )
}
export default Technologies