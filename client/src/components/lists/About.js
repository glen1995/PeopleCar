import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import { GET_PEOPLE_CARS } from '../../queries'

const About = () => {
    const location = useLocation()
    const id = location.state.id
    const { loading, error, data } = useQuery(GET_PEOPLE_CARS, {variables: {personId: id}})
    if(data) {
        console.log(data)
    }
    return (
        <div>
            {data && data.findpeoplecar.map((car) => (
                <div>
                    <div className="cars"  style={{
                        backgroundColor: '#ccc',
                        display: "inline-block"
                    }}>
                        <p>{car.make} {car.model}</p>
                        <p>price: {car.price}</p>
                        <p>year: {car.year}</p>
                    </div>
                </div>
            ))}
            <Link to="/">Go Back</Link>
        </div>
    )
}
export default About