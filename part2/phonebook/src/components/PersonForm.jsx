function PersonForm({
  addNewName,
  newName,
  handleNewNameChange,
  newNumber,
  handleNewNumberChange,
}) {
  return (
    <form onSubmit={addNewName}>
      <div>
        name:{' '}
        <input
          value={newName}
          onChange={handleNewNameChange}
        />
        <br />
        number:{' '}
        <input
          value={newNumber}
          onChange={handleNewNumberChange}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
}

export default PersonForm;
