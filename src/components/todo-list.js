import React from "react";

import TodoListItem from "./todo-list-item";

const TodoList = () => {
  return (
    <ul>
      <li><TodoListItem label='Drink Coffee' /></li>
      <li><TodoListItem 
        label='Build Reack app'
        important /></li>
    </ul>
  )
};

export default TodoList;