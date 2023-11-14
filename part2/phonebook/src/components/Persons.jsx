import SinglePerson from './SinglePerson';

function Persons({ persons, deletePerson }) {
  return persons.map((p) => (
    <SinglePerson
      key={p.id}
      person={p}
      deletePerson={deletePerson}
    />
  ));
}

export default Persons;
