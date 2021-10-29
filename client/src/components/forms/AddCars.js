import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { Form, Input, Button, Select } from 'antd'

import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CARS, GET_CONTACTS } from '../../queries'

const AddCars = () => {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [selectValue, setSelectValue] = useState("Intial")
  const { loading, error, data } = useQuery(GET_CONTACTS)
  const [addCars] = useMutation(ADD_CAR)
  useEffect(() => {
    forceUpdate({})
  }, [])

  if (loading) return 'Loading...'
  if (error) {
    return `Error! ${error.message}`
  }

  const onFinish = values => {
    const { year, make, price, model, personId } = values

    addCars({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addCars: {
          __typename: 'Car',
          id,
          year,
          make,
          model,
          price,
          personId
        }
      },
      update: (proxy, { data: { addCars } }) => {
        const data = proxy.readQuery({ query: GET_CARS })
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCars]
          }
        })
        
      }
    })
  }
  function handleChange(value) {
    setSelectValue(value)
  }

  return (
    <div>
      <Form
        form={form}
        name='add-car-form'
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{ marginBottom: '40px' }}
      >
        <Form.Item
          name='year'
          rules={[{ required: true, message: 'Please input your year! ' }]}
        >
          <Input placeholder='i.e. 1995' />
        </Form.Item>
        <Form.Item
          name='make'
          rules={[{ required: true, message: 'Please input your make! ' }]}
        >
          <Input placeholder='i.e. Toyota' />
        </Form.Item>
        <Form.Item
          name='price'
          rules={[{ required: true, message: 'Please input your price! ' }]}
        >
          <Input placeholder='i.e. 10000' />
        </Form.Item>
        <Form.Item
          name='model'
          rules={[{ required: true, message: 'Please input your model! ' }]}
        >
          <Input placeholder='i.e. LX 400' />
        </Form.Item>
        <Form.Item
          name='personId'
          rules={[{ required: true, message: 'Please select the person ' }]}
        >
          <Select value={data && selectValue} style={{ width: 120 }} onChange={handleChange}>
            {data && data.peoples.map((people, index) => (
              <Select.Option key={index+1} value={(index+1).toString()}>{people.firstName+ " " + people.lastName}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type='primary'
              htmlType='submit'
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddCars
