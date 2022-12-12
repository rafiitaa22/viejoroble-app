const TimePicker = (props) => {
  return (
    <select className="form-select" ref={props.hourRef} name="hora" required>
      {props.availableHours.map((hora, i) => {
        return (
          <option
            key={i}
            value={hora}
            disabled={hora.charAt(2) !== ":" && "disabled"}
          >
            {hora}
          </option>
        );
      })}
    </select>
  );
};

export default TimePicker;
