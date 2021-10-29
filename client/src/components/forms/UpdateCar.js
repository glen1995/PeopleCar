import React, { useEffect, useState } from 'react'

import { Form, Input, Button, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_CAR, GET_CONTACTS } from '../../queries'

const UpdateCar = props => {
  console.log(props)
  const [id] = useState(props.id)
  const [make, setMake] = useState(props.make)
  const [model, setModel] = useState(props.model)
  const [price, setPrice] = useState(props.price)
  const [year, setYear] = useState(props.year)
  const [personId, setPersonId] = useState(props.personId)
  const [updateCar] = useMutation(UPDATE_CAR)
  useEffect(() => {
    forceUpdate()
  }, [])
  const { loading, error, data } = useQuery(GET_CONTACTS)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  if (loading) return 'Loading...'
  if (error) {
    return `Error! ${error.message}`
  }

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value)
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

  function handleChange(value) {
    updateStateVariable('personId', value)
  }

  const onFinish = values => {
    const { year, make, model, price, personId } = values


    updateCar({
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
        updateCar: {
          __typename: 'Car',
          id,
          year,
          make,
          model,
          price,
          personId
        }
      }
    })
    props.onButtonClick()
  }

  return (
    <Form
      form={form}
      name='update-contact-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId
      }}
      size='large'
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input year!' }]}
      >
        <Input onChange={e => updateStateVariable('year', e.target.value)} />
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input make!' }]}
      >
        <Input onChange={e => updateStateVariable('make', e.target.value)} />
      </Form.Item>
      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input model!' }]}
      >
        <Input onChange={e => updateStateVariable('model', e.target.value)} />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input price!' }]}
      >
        <Input onChange={e => updateStateVariable('price', e.target.value)} />
      </Form.Item>
      <Form.Item
        name='personId'
        rules={[{ required: true, message: 'Please input personId!' }]}
      >
        <Input onChange={e => updateStateVariable('personId', e.target.value)} />
      </Form.Item>
      {/* <Form.Item
          name='personId'
          rules={[{ required: true, message: 'Please select the person ' }]}
        >
          { data && 
            <Select style={{ width: 120 }} onChange={e => handleChange(e.target.value)}>
            {data && data.peoples.map((people, index) => (
                <Select.Option key={people.id} value={(people.id).toString()}>{people.firstName+ " " + people.lastName}</Select.Option>

            ))}
            </Select>
          }
        </Form.Item> */}

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('price') && !form.isFieldTouched('personId')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateCar
