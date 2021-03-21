import React, { useState, useEffect } from 'react';
import Persons from './Persons';
import PersonForm from './PersonForm';
import SearchFilter from './SearchFilter';
import ErrorMessage from './ErrorMessage';
import personService from '../services/persons';
import '../index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [errorMessageColor, setErrorMessageColor] = useState(`green`);
  const [errorMessage, setErrorMessage] = useState(null);
  
  useEffect(() => {
    personService.getAll()
    .then((persons)=>{
      setPersons(persons)
    })
  }, [])

  const [ newName, setNewName ] = useState('');
  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const [ newNumber, setNewNumber ] = useState('')
  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const [ newSearch, setNewSearch ] = useState('');
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);
  }

  const addOrUpdatePerson = (event) => {
    event.preventDefault();
    const p_array = persons.filter((p) => {
      return p.name === newName;
    });
    if (p_array.length !== 0){
      // Person already exists
      const person = p_array[0];
      if (window.confirm(`${person.name} is already added to the phonebook. Replace old number with a new one?`)){
        const newPerson = {
          id: person.id,
          name: person.name,
          number: newNumber,
        };
        personService.updatePerson(newPerson)
        .then((res)=>{
          setErrorMessageColor(`green`);
          setErrorMessage(`${newPerson.name} has had his/her phone number modified  (${newPerson.number})`)
          setTimeout(()=>{
            setErrorMessageColor(`green`);
            setErrorMessage(null);
          }, 2000);
          setPersons(persons.map((p)=>{
            if(p.id === newPerson.id){
              return newPerson;
            } else {
              return p;
            }
          }))
        })
        .catch((res)=>{
          setErrorMessageColor(`red`);
          setErrorMessage(`Ups! ${newPerson.name} has been deleted from the server`)
          setTimeout(()=>{
            setErrorMessageColor(`green`);
            setErrorMessage(null);
          }, 2000);
        })
      }
    } else {
      const newPerson = {
        id: persons[persons.length - 1].id + 1,
        name: newName,
        number: newNumber,
      };
      personService.createPerson(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));
        setErrorMessageColor(`green`)
        setErrorMessage(`${newPerson.name} has been added with phone number: (${newPerson.number})`)
        setTimeout(()=>{
          setErrorMessageColor(`green`)
          setErrorMessage(null);
        }, 2000);
      })
    }
    setNewName("");
    setNewNumber("");
    setNewSearch("");
  }

  const handleButtonDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}?`)
    if (result){
      personService.deletePerson(person.id)
      .then(res => {
        if (res){
          setPersons(persons.filter((p)=>{
            return p.id !== person.id;
          }))
        }
        setErrorMessageColor(`green`)
        setErrorMessage(`${person.name} with phone number ${person.number} has been removed`)
        setTimeout(()=>{
          setErrorMessageColor(`green`)
          setErrorMessage(null);
        }, 2000);
        return res;
      })

    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorMessage message={errorMessage} messageColor={errorMessageColor}></ErrorMessage>
      <SearchFilter
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addOrUpdatePerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} 
        newSearch={newSearch}
        handleButtonDelete={handleButtonDelete} />
    </div>
  );
}

export default App