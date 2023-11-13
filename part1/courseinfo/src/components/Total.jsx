const Total = ({ parts }) => {
  return (
    <p>
      <b>
        total of {parts.reduce((curr, next) => curr + next.exercises, 0)} parts
      </b>
    </p>
  );
};

export default Total;
