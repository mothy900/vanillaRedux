import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreator } from "../Store";
import ToDo from "../components/ToDo";

function Home({ toDos, addToDo }) {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
    console.log(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    addToDo(text);
    setText("");
  }
  return (
    <>
      <h1>ToDo</h1>
      <form onSubmit={onSubmit}>
        <input type={"text"} value={text} onChange={onChange}></input>
        <button>ADD</button>
      </form>
      <ul>
        {toDos.map((toDo) => {
          <ToDo {...toDo} />;
        })}
      </ul>
    </>
  );
}

function getCurrentState(state) {
  return { toDos: state };
}
function mapDispatchToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(actionCreator.addToDo(text)),
  };
}
export default connect(getCurrentState, mapDispatchToProps)(Home);
// connet 첫번째 인자는 getState(), 두번째는 getDispatch()
