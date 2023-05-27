import { useState } from "react";
import { GET_PROJECT } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm({project}){
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState('');

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {name, description, status, id: project.id},
        refetchQueries: [{query: GET_PROJECT}],
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !description || !status) {
            return alert('Please fill in all fields.');
        }

        updateProject();
    }

    return <div className="mt-5">
        <h3>Update Project Details</h3>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                    type="text" name="name" id="name" 
                    className='form-control' value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea 
                    name="description" id="description" 
                    className='form-control' value={description}
                    onChange={e => setDescription(e.target.value)}
                >
                </textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select 
                    className='form-select' id='status' value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value='new'>New</option>
                    <option value='progress'>In Progress</option>
                    <option value='completed'>Completed</option>
                </select>
            </div>

            <button 
                type="submit" className="btn btn-primary"
            >
                Submit
            </button>
        </form>
    </div>
}