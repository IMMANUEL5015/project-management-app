import {FaUser} from 'react-icons/fa';
import { useState } from 'react';
import {useMutation} from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

const AddClientModal = function(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {name, email, phone},
        update(cache, response){
            const {clients} = cache.readQuery({query: GET_CLIENTS});
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {clients: [...clients, response.data.addClient]},
            });
        }
    });

    const handleSubmit = function(e) {
        e.preventDefault();

        if (!name || !email || !phone) {
            return alert('Please fill in all fields.');
        }

        addClient();
        setName('');
        setEmail('');
        setPhone('');
    }

    return <>
        <button 
            type="button" 
            className="btn btn-secondary" 
            data-bs-toggle="modal" 
            data-bs-target="#addClientModal"
        >
            <div className="d-flex align-items-center">
                <FaUser className='icon'/>
                <div>Add Client</div>
            </div>
        </button>

        <div className="modal fade" id="addClientModal" 
            tabIndex="-1" aria-labelledby="addClientModalLabel" 
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addClientModalLabel">Add Client</h1>
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
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="text" name="email" id="email" 
                                    className='form-control' value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input 
                                    type="text" name="phone" id="phone" 
                                    className='form-control' value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>

                            <button 
                                type="submit" className="btn btn-secondary"
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

export default AddClientModal