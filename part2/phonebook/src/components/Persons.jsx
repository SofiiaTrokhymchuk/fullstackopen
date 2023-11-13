import SinglePerson from './SinglePerson';

function Persons({ persons }) {
  return persons.map((p) => (
    <SinglePerson
      key={p.id}
      person={p}
    />
  ));
}

export default Persons;
