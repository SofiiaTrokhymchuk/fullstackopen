function SinglePerson({ person, deletePerson }) {
  const { id, name, number } = person;
  return (
    <div>
      <span>
        {name} {number}{' '}
      </span>
      <button onClick={() => deletePerson(id)}>delete</button>
    </div>
  );
}

export default SinglePerson;
