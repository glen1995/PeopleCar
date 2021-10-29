import { gql } from '@apollo/client'

export const GET_CONTACTS = gql`
  {
    peoples {
      id
      firstName
      lastName
    }
  }
`

export const GET_CARS = gql`
  {
    cars {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const GET_PEOPLE_CARS = gql`
  query Query($personId: String!) {
    findpeoplecar(personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const ADD_PEOPLE = gql`
  mutation AddPeople($id: String!, $firstName: String!, $lastName: String!) {
    addPeople(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_CONTACT = gql`
  mutation UpdatePeople($id: String!, $firstName: String!, $lastName: String!) {
    updatePeople(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_PEOPLE = gql`
  mutation RemovePeople($id: String!) {
    removePeople(id: $id) {
      id
      firstName
      lastName
    }
  }
`


export const REMOVE_CAR = gql`
  mutation removeCar($id: String!) {
    removeCar(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`
