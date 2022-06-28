import { gql } from '@apollo/client'

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!){
        deleteClient(id: $id){
            id
            name
            phone
            email
        }
    }
`
export { DELETE_CLIENT }

