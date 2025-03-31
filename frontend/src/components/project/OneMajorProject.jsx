const OneMajorProject=({project})=> {
    return (
        <div className="border-2  min-w-[40%] min-h-[30em]">
            <p>{project.image}</p>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <p>{project.github}</p>
        </div>
    )
}
export default OneMajorProject;