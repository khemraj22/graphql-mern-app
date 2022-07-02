import { FaTrash } from 'react-icons/fa'
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'
import { GET_PROJECTS } from '../queries/projectQueries'
import { useMutation } from '@apollo/client'

export default function ClientRow({ client }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {
            id: client.id
        },
        // Sol 1. to refresh result on UI after delete
        refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],

        // Sol 2. use inmemory cache to refresh result on UI after delete operation
        // update(cache, { data: { deleteClient } }) {
        //     const { clients } = cache.readQuery({
        //         query: GET_CLIENTS
        //     });
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: { clients: clients.filter(client => client.id !== deleteClient.id) }
        //     })
        // }
    });

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className='btn btn-danger btn-sm' onClick={deleteClient}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    )
}
