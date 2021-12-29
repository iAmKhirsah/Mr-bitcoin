export function Input({ onChangeFilter }) {
  function handleChange({ target }) {
    let value = {
      str: '',
      term: target.value,
    };
    onChangeFilter(value);
  }
  return (
    <div className="input">
      <input type="text" onChange={handleChange} placeholder="Search..."/>
    </div>
  );
}
