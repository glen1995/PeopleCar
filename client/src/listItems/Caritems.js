import React, { useState } from 'react'
import { Card } from 'antd'
import RemoveCar from '../components/buttons/RemoveCar'


const Caritems = ({ carData, person }) => {
    const [editMode, setEditMode] = useState(false)
    const handleButtonClick = () => {
        setEditMode(!editMode)
    }
    return (
        <div>
            {editMode ? (
                <p>hii</p>
            ) : (
            <div>   
                {
                    carData.map((car) =>(
                        <Card
                            key={car.id}
                            style={{ marginTop: 16 }}
                            type="inner"
                            actions={[
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
                    ))   
                }
            </div>
            )}
        </div>
    )
}

export default Caritems
