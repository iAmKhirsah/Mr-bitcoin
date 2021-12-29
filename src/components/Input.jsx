export function Input({ onChangeFilter }) {
  function handleChange({ target }) {
    console.log(target);
    let value = {
      term: target.value,
    };
    onChangeFilter(value);
  }
  return (
    <div className="input">
      <input type="text" onChange={handleChange} placeholder="Search..."  name="term" id="term"/>
    </div>
  );
}
