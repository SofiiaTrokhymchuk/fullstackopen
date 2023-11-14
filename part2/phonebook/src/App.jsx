import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState('');

  const fetchPersons = () => {
    personsService.getAll().then((persons) => setPersons(persons));
  };

  useEffect(fetchPersons, []);

  const delayNotification = () => {
    setTimeout(() => {
      setMessage(null);
      setStatus('');
    }, 5000);
  };

  const handleNewNameChange = (e) => setNewName(e.target.value);

  const handleNewNumberChange = (e) => setNewNumber(e.target.value);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const updatePerson = (person) => {
    personsService
      .update(person.id, {
        ...person,
        number: newNumber,
      })
      .then((newPerson) =>
        setPersons(persons.map((p) => (p.id === person.id ? newPerson : p)))
      )
      .then(() => {
        setMessage(`${person.name} was successfully updated!`);
        setStatus('success');
        delayNotification();
      })
      .catch((e) => {
        setMessage(`Opps, something went wrong...\n ${e.message}`);
        setStatus('error');
        delayNotification();
      });
  };

  const addNewName = (e) => {
    e.preventDefault();
    const personExists = persons.find((p) => p.name === newName);

    if (personExists) {
      const isPersonUpdated = window.confirm(
        `${personExists.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (!isPersonUpdated) return;
      updatePerson(personExists);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsService
      .create(newPerson)
      .then((person) => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
      })
      .then(() => {
        setMessage(`${newPerson.name} was successfully added!`);
        setStatus('success');
        delayNotification();
      })
      .catch((e) => {
        setMessage(`Opps, something went wrong...\n ${e.message}`);
        setStatus('error');
        delayNotification();
      });
  };

  const deletePerson = (id) => {
    const deletedPerson = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      personsService
        .remove(id)
        .then(() => setPersons(persons.filter((p) => p.id !== id)))
        .then(() => {
          setMessage(`${deletedPerson.name} was successfully deleted!`);
          setStatus('success');
          delayNotification();
        })
        .catch((e) => {
          setMessage(`Opps, something went wrong...\n ${e.message}`);
          setStatus('error');
          delayNotification();
        });
    }
  };

  if (!persons) return;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
        status={status}
      />
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
      <Persons
        persons={persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        )}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
