import { useNavigate } from "react-router-dom";
import {FaTrash} from "react-icons/fa";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutations";

const DeletePojectButton = function({projectId}){  
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: {id: projectId},
        onCompleted: () => navigate('/'),
        refetchQueries: [{query: GET_PROJECTS}],
    });
    
    return <div className="mt-5 ms-auto">
        <button className="btn btn-danger" onClick={deleteProject}>
            <FaTrash/> Delete Icon
        </button>
    </div>
}

export default DeletePojectButton;