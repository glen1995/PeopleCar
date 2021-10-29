import React from 'react'
import { useMutation } from '@apollo/client'
import { filter } from 'lodash'
import { DeleteOutlined } from '@ant-design/icons'
import { GET_CONTACTS, REMOVE_PEOPLE } from '../../queries'

const RemoveContact = ({ id, firstName, lastName }) => {

  const [removePeople] = useMutation(REMOVE_PEOPLE, {
    update(cache, { data: { removePeople } }) {
      const { peoples } = cache.readQuery({ query: GET_CONTACTS })
      cache.writeQuery({
        query: GET_CONTACTS,
        data: {
          peoples: filter(peoples, p => {
            return p.id !== removePeople.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this contact?')

    if (result) {
      removePeople({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removePeople: {
            __typename: 'People',
            id,
            firstName,
            lastName
          }
        }
      })
    }
  }

  return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default RemoveContact
