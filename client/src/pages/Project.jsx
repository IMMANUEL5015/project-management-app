import { GET_PROJECT } from "../queries/projectQueries";
import { useQuery } from "@apollo/client";
import Spinner from "../components/Spinner";
import {Link, useParams } from "react-router-dom";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

const Project = function(){
    const {id} = useParams();
    const {loading, error, data} = useQuery(GET_PROJECT, {
        variables: {id}
    });

    if (loading) return <Spinner/>
    if (error) return <p>Something went wrong.</p>

    return <div>
        {
            <div className="card p-5 w-75 mx-auto">
                <Link 
                    to="/" 
                    className="btn btn-light btn-sm w-25 ms-auto"
                >
                    Back
                </Link>

                <h1>{data.project.name}</h1>
                <p>{data.project.description}</p>
                <h5 className="mt-3">Project Status</h5>
                <p className="lead">{data.project.status}</p>
                <ClientInfo client={data.project.client}/>

                <DeleteProjectButton projectId={id}/>
                <EditProjectForm project={data.project}/>
            </div>
        }
    </div>
}

export default Project;