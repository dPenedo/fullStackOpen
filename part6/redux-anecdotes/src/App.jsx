import { useSelector, useDispatch } from "react-redux";
import reducer from "./reducers/anecdoteReducer";
import { createStore } from "redux";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const store = createStore(reducer);

  const vote = (id) => {
    store.dispatch({
      type: "VOTE",
      payload: { id },
    });
    console.log("vote", id);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {store.getState().anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}

      <h2>create new</h2>
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;

