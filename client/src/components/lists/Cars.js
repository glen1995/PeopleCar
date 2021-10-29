import React from 'react'
import { useQuery } from '@apollo/client'
import { List } from 'antd'
import Car from '../../listItems/Car'
import { GET_CARS } from '../../queries'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  },
  header: {
    fontSize: "2.5rem"
  }
})

const Cars = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_CARS)
  if (loading) return 'Loading...'
  if (error) {
    return `Error! ${error.message}`
  }

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      <h2 style={styles.header}>Cars</h2>
      {data.cars.map((data) => (
        <List.Item key={data.id}>
          <Car key={data.id} data={data}/>
        </List.Item>
      ))}
    </List>
  )
}

export default Cars
