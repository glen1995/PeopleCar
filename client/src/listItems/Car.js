import React, { useState } from 'react'
import { Card } from 'antd'
import RemoveCar from '../components/buttons/RemoveCar'

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

const Car = props => {
    const [id] = useState(props.data.id)
    const [make, setMake] = useState(props.data.make)
    const [model, setModel] = useState(props.data.model)
    const [price, setPrice] = useState(props.data.price)
    const [year, setYear] = useState(props.data.year)
    const [editMode, setEditMode] = useState(false)


    const styles = getStyles()

      const updateStateVariable = (variable, value) => {
          console.log(variable)
        switch (variable) {
          case 'firstName':
            setModel(value)
            setMake(value)
            setYear(value)
            break
          case 'lastName':
            setPrice(value)
            break
          default:
            break
        }
      }

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    return (
        <div className="hello">
            {editMode ? (
                <p>hiii</p>
            ) : (
                <Card
                    style={styles.card}
                    actions={[
                        <RemoveCar id={id} make={make} model={model} price={price} year={year} personId={props.data.personId} flag="working"/>
                    ]}
                >
                    <p>{make} {model}</p>
                    <p>year: {year}</p>
                    <p>price: {price}</p>
                </Card>
            )}
        </div>
    )
}

export default Car
