import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import RemoveContact from '../components/buttons/RemoveContact'
import UpdateContact from '../components/forms/UpdateContact'
import Caritems from './Caritems'
import { Link } from 'react-router-dom';

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Contact = props => {
  const [id] = useState(props.id)
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [editMode, setEditMode] = useState(false)

  const styles = getStyles()

  const updateStateVariable = (variable, value) => {

    switch (variable) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      default:
        break
    }
  }

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {editMode ? (
        <UpdateContact
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveContact id={id} firstName={firstName} lastName={lastName} />
          ]}
        >
          {firstName} {lastName}
          <Caritems carData={props.data} person={firstName+ " " +lastName}/>
        </Card>
      )}
      {/* <Link {{ pathname: '/route', state: { foo: 'bar'} }}>Show More</Link> */}
      <Link to={{ pathname: `/people/${id}`, state: { id: id} }}>Show More</Link>
{/*  */}
    </div>
  )
}

export default Contact
