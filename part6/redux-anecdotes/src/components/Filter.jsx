import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(filterChange(event.target.value));
  };
  const style = {
    marginButton: 10,
  };
  return (
    <div style={style}>
      Filter
      <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
