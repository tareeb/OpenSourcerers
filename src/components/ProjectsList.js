import ProjectsCard from "./ProjectsCard"

function ProjectLists({projects}) {

  return (
    <div className="listcontainer" style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "10px",
        padding:"0% 5%"
    }}>
        {projects.slice(0,10).map(project => (
            <ProjectsCard key={project.id} project={project}></ProjectsCard>
        ))}
    </div>
  )

}

export default ProjectLists