import React from "react";
import { Link } from "react-router-dom";

function ProjectsCard({project}){
    return(
        <div className="card" style={{
            border: "2px solid black",
            padding: "10px",
            backgroundColor: "white",
            color: "black",
            width: "fit-content",
            borderRadius: "5px",
            fontSize: "15px",
            fontWeight: "bold",
            flexBasis: "300px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        }}>
            <h3>{project.title}</h3>
            <div style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexWrap:"wrap",
                gap:"10px"
            }} >
                {
                    project.tags.map(tag => (
                           <div key={tag.id}
                                style={{
                                border:"1px solid black",
                                fontSize:"10px", 
                                width:"fit-content",
                                padding:"2px 5px",
                                backgroundColor:"#064472d4",
                                color:"white",
                                borderRadius:"20px",
                                fontWeight:"400",
                            }}>
                                <p>{tag.name}</p>
                            </div> 
                        )
                    )
                }
            </div>
            <Link style={{
                cursor: "pointer",
                textDecoration: "none", 
                color: "#0a5441",
            }}
                to={`/projectdetails/${project.title}/${project.id}`}>View Details</Link>
        </div>
    )
}

export default ProjectsCard;