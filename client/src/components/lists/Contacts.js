import React from 'react'
import { useQuery } from '@apollo/client'
import { List } from 'antd'
import Contact from '../../listItems/Contact'
import { GET_CONTACTS, GET_CARS } from '../../queries'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Contacts = () => {
  const styles = getStyles()

 
  const { loading: loading1, error:error1, data: data1  } = useQuery(GET_CONTACTS)
  const { loading: loading2, error:error2, data: data2  } = useQuery(GET_CARS)

  const getCars = (cars, id) => {
    return cars.filter(car => car.personId === id);
  }

  const validations = (loading, error) => {
    if (loading) return 'Loading...'
    if (error) {
      return `Error! ${error.message}`
    }
  }

  validations(loading1, error1);
  validations(loading2, error2);

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data1 && data2 && data1.peoples.map(({ id, firstName, lastName }) => {
        let carData = getCars(data2.cars, id)
        return <List.Item key={id}>
          <Contact key={id} id={id} firstName={firstName} lastName={lastName} data={carData}/>
        </List.Item>
      })}
    </List>
  )
}

export default Contacts
