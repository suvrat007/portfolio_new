import React from "react";

const OneProject = ({project}) => {
    return (
        <div className=" h-full border-2 p-4 rounded-2xl min-w-80 min-h-40">
            <h1>{project.image}</h1>
            <h1>{project.name}</h1>
            <h1>{project.description}</h1>
            <h1>{project.github}</h1>
        </div>
    );
};

export default OneProject;

