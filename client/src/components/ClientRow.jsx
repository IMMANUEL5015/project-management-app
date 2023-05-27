import {FaTrash} from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function ClientRow({client}){
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
        refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}],
        // update(cache, response){
        //     const data = cache.readQuery({query: GET_CLIENTS});
        //     const {clients} = data;
        //     const updatedClients = clients.filter(
        //         client => client.id !== response.data.deleteClient.id
        //     );
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: {clients: updatedClients}
        //     });
        // }
    });

return <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td>
            <button className="btn btn-danger" onClick={deleteClient}>
                <FaTrash/>
            </button>
        </td>
    </tr>
}