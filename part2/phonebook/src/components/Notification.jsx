const Notification = ({ status, message }) => {
  const notification = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const error = {
    color: 'red',
  };

  const success = {
    color: 'green',
  };

  const statusClass = status === 'success' ? success : error;

  if (message === null) {
    return null;
  }

  return <div style={{ ...notification, ...statusClass }}>{message}</div>;
};

export default Notification;
