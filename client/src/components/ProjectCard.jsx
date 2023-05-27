import {Link} from "react-router-dom";

const ProjectCard = function({project}){
    return <div className="col-md-4">
        <div className="card mb-3 mt-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">
                        {project.name}
                    </h5>

                    <Link 
                        to={`/projects/${project.id}`} 
                        className="btn btn-light"
                    >
                        View    
                    </Link>
                </div>

                <p className="small">
                    Status: {project.status}
                </p>
            </div>
        </div>
    </div>
}

export default ProjectCard