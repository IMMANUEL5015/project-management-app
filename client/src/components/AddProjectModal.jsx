import {FaList} from 'react-icons/fa';
import { useState } from 'react';
import {useMutation, useQuery} from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

const AddProjectModal = function(){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [clientId, setClientId] = useState('');
    const [status, setStatus] = useState('new');

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {name, description, clientId, status},
        update(cache, {data: {addProject}}){
            const {projects} = cache.readQuery({query: GET_PROJECTS});
            cache.writeQuery({  
                query: GET_PROJECTS,
                data: {projects: projects.concat([addProject])}
            });
        }
    });

    const {loading, error, data} = useQuery(GET_CLIENTS);

    const handleSubmit = async function(e) {
        e.preventDefault();

        if (!name || !description || !status || !clientId) {
            return alert('Please fill in all fields.');
        }

        try {
            await addProject();
        } catch (error) {
            console.log(error);
        }

        setClientId('');
        setName('');
        setDescription('');
        setStatus('new');
    }

    if (loading) return null;
    if (error) return <p>'Something went wrong trying to load the form.'</p>

    return <>
        <button 
            type="button" 
            className="btn btn-primary ms-3" 
            data-bs-toggle="modal" 
            data-bs-target="#addProjectModal"
        >
            <div className="d-flex align-items-center">
                <FaList className='icon'/>
                <div>New Project</div>
            </div>
        </button>

        <div className="modal fade" id="addProjectModal" 
            tabIndex="-1" aria-labelledby="addProjectModalLabel" 
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addProjectModalLabel">New Project</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
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

                            <div className="mb-3">
                                <label htmlFor="client" className="form-label">Select Client</label>
                                <select 
                                    className='form-select' id='client' value={clientId}
                                    onChange={(e) => setClientId(e.target.value)}
                                >
                                    {
                                        data.clients.map(client => 
                                        <option value={client.id} key={client.id}>
                                            {client.name}
                                        </option>)
                                    }
                                </select>
                            </div>

                            <button 
                                type="submit" className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AddProjectModal