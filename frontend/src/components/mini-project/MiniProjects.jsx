import React from "react";
import OneProject from "./OneProject";

const MiniProjects = () => {
    return (
        <div className="w-full">
            <h1 className={'text-3xl p-4'}>Mini-Projects</h1>
            <div className="overflow-x-auto border-2 p-5 ">

                <div className="flex flex-row gap-6 min-w-max">
                    <OneProject/>
                    <OneProject/>
                    <OneProject/>
                    <OneProject/>
                    <OneProject/>
                    <OneProject/>
                    <OneProject/>
                    <OneProject/>
                    <OneProject/>
                    <OneProject/>
                </div>
            </div>
        </div>

    );
};

export default MiniProjects;
