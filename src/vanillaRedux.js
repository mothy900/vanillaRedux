import { act } from "react-dom/test-utils";
import { createStore } from "redux"; // createStore - state 를 저장하는 곳 나의 데이터를 저장하는 곳을 생성함.

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

//action creater
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text: text,
  };
};
const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id: id,
  };
};

const reducer = (state = [], action) => {
  // 나의 데이터를 modify(수정하다, 바꾸다) 하는 함수,
  // 유일하게 데이터를 바꿀 수 있음.
  // action은 2번째 argument 이며 modify를 컨트롤 한다.

  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [...state, newToDoObj];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer); //내 데이터를 저장하는 곳

store.subscribe(() => console.log(store.getState()));

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos); // subscribe -> 감시자

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
