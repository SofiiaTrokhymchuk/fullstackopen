import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [personsShown, setPersonsShown] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value.toLowerCase();
    setFilter(newFilter);
    setPersonsShown(
      [...persons].filter((p) => p.name.toLowerCase().includes(newFilter))
    );
  };

  const addNewName = (e) => {
    e.preventDefault();
    for (const p of persons) {
      if (p.name === newName) {
        return alert(`${newName} is already added to phonebook`);
      }
    }
    const newPersons = persons.concat({
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    });
    setPersons(newPersons);
    setPersonsShown(newPersons);
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsShown} />
    </div>
  );
};

export default App;
