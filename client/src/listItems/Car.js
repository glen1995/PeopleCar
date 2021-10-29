import React, { useState } from 'react'
import { Card } from 'antd'
import RemoveCar from '../components/buttons/RemoveCar'
import UpdateCar from '../components/forms/UpdateCar'
import { EditOutlined } from '@ant-design/icons'


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
    const [personId, setPersonId] = useState(props.data.personId)
    const [editMode, setEditMode] = useState(false)


    const styles = getStyles()

      const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'year':
                setYear(value)
                break
            case 'make':
                setMake(value)
                break
            case 'model':
                setModel(value)
                break
            case 'price':
                setPrice(value)
                break
            case 'personId':
                setPersonId(value)
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
                <UpdateCar
                    id={id}
                    make={make}
                    model={model}
                    price={price}
                    year={year}
                    flag={1}
                    onButtonClick={handleButtonClick}
                    updateStateVariable={updateStateVariable}
              />
            ) : (
                <Card
                    style={styles.card}
                    actions={[
                        <EditOutlined key='edit' onClick={handleButtonClick} />,
                        <RemoveCar id={id} make={make} model={model} price={price} year={year} personId={personId} flag="working"/>
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
