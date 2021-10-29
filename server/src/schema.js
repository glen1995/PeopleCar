import { gql } from 'apollo-server-express'
import { find, remove, filter } from 'lodash'

const people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const cars = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3'
  }
]

const typeDefs = gql`
  type People {
    id: String!
    firstName: String!
    lastName: String!
  }

  type Car {
    id: String!
    year: String!
    make: String!
    model: String!
    price: String!
    personId: String!
  }

  type Query {
    people(id: String!): People
    peoples: [People]
    findpeoplecar(personId : String!): [Car!]!
    car(id: String!): Car
    cars: [Car!]!
  }

  type Mutation {
    addPeople(id: String!, firstName: String!, lastName: String!): People
    updatePeople(id: String!, firstName: String!, lastName: String!): People
    removePeople(id: String!): People
    addCars(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    updateCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    removeCar(id: String!): Car

  }
`

const resolvers = {
  Query: {
    people(parent, args, context, info) {
      return find(people, { id: args.id })
    },
    peoples: () => people,
    car(parent, args, context, info) {
      return find(cars, { id: args.id })
    },
    findpeoplecar(parent, args, context, info) {
      return filter(cars, { personId: args.personId })
    },
    cars: () => cars
  },
  Mutation: {
    addPeople: (root, args) => {
      const newPeople = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }
      people.push(newPeople)
      return newPeople
    },
    addCars: (root, args) => {
      const p = find(people, { id: args.personId })
      if (!p) {
        throw new Error(`There is no person with this ID ${args.personId}`)
      }
      const newCars = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId
      }
      cars.push(newCars)
      return newCars
    },
    updatePeople: (root, args) => {
      const updatedPeople = find(people, { id: args.id })
      if (!updatedPeople) {
        throw new Error(`Couldn't find contact with id ${args.id}`)
      }

      updatedPeople.firstName = args.firstName
      updatedPeople.lastName = args.lastName

      return updatedPeople
    },
    updateCar: (root, args) => {
      const car = find(cars, { id: args.id })
      
      if (!car) {
        throw new Error(`There is no car with this ID ${args.id}`)
      }

      car.id = args.id
      car.year = args.year
      car.make = args.make
      car.model = args.model
      car.price = args.price
      car.personId = args.personId
      return car
    },
    removePeople: (root, args) => {
      const removedPeople = find(people, { id: args.id })
      if (!removedPeople) {
        throw new Error(`Couldn't find contact with id ${args.id}`)
      }

      remove(people, c => {
        return c.id === removedPeople.id
      })

      return removedPeople
    },
    removeCar: (root, args) => {
      const removedCar = find(cars, {id: args.id})
      if(!removedCar) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }
      remove(cars, c => {
        return c.id === removedCar.id
      })

      return removedCar
    }
  }
}

export { typeDefs, resolvers }
