import {gql} from '@apollo/client';

export const ADD_PROJECT = gql`
    mutation addProject(
        $name: String!, $description: String!, $clientId: ID!, $status: ProjectStatusCreate!
    ) {
        addProject(
            name: $name, description: $description, clientId: $clientId, status: $status
        ){
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;

export const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id){
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;

export const UPDATE_PROJECT = gql`
    mutation updateProject(
        $name: String!, $description: String!, $status: ProjectStatusUpdate!, $id: ID!
    ) {
        updateProject(
            name: $name, description: $description, status: $status, id: $id
        ){
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;
