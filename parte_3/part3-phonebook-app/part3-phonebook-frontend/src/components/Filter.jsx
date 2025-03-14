const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={value} onChange={onChange} autoComplete="off" />
    </div>
  );
};

export default Filter;
