import './form-input.scss';
function FormInput({ handleChange, label, ...otherProps }) {
  let { value, error } = otherProps;
  return (
    <div className="group">
      <input
        className="form-input"
        onChange={handleChange}
        {...otherProps}
        style={error && { borderColor: '#ff0000' }}
      />
      {label ? (
        <label
          className={`${value.length > 0 ? 'shrink' : ''} form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
}
export default FormInput;
