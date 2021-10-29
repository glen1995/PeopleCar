import React from 'react'
import './App.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import AddContact from './components/forms/AddContact'
import AddCars from './components/forms/AddCars'
import Title from './components/layout/Title'
import Contacts from './components/lists/Contacts'
import Cars from './components/lists/Cars'
import About from './components/lists/About'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => (
  
    <ApolloProvider client={client}>
      <Switch>
        <Route exact path="/">
          <div className='App'>
            <Title />
            <AddContact />
            <Contacts />
            <h2 style={{"fontSize": "2rem"}}>Cars</h2>
            <AddCars />
            <Cars />
          </div>
        </Route>
        <Route path="/people">
            <About />
        </Route>
      </Switch>
    </ApolloProvider>
)
export default App
