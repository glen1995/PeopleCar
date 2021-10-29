import React, { useState } from 'react'
import { Card } from 'antd'
import RemoveCar from '../components/buttons/RemoveCar'
import UpdateCar from '../components/forms/UpdateCar'
// import { EditOutlined } from '@ant-design/icons'
    


const Caritems = ({ carData, person }) => {
    const [id] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [make, setMake] = useState("")
    const [model, setModel] = useState("")
    const [price, setPrice] = useState("")
    const [year, setYear] = useState("")

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
                <UpdateCar
                    id={id}
                    make={make}
                    model={model}
                    price={price}
                    year={year}
                    flag={0}
                    onButtonClick={handleButtonClick}
                    updateStateVariable={updateStateVariable}
                />
            ) : (
            <div>   
                {
                    carData.map((car) => {
                        return <Card
                            key={car.id}
                            style={{ marginTop: 16 }}
                            type="inner"
                            actions={[
                                // <EditOutlined key='edit' onClick={handleButtonClick} />,
                                <RemoveCar id={car.id} make={car.make} model={car.model} price={car.price} year={car.year} personId={car.personId} flag={"Not working"}/>
                            ]}
                        >
                            <div>
                                {/* <p>Owner: {person}</p> */}
                                <p>Make: {car.make}</p>
                                <p>Model: {car.model}</p>
                                <p>price: {car.price}</p>
                            </div>
                        </Card>
                    })   
                }
            </div>
            )}
        </div>
    )
}

export default Caritems
