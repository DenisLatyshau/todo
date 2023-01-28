import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: ''
  } 

  createTodoItem(label) {
    return {
        label: label,
        important: false,
        done: false,
        id: this.maxId++
      }
    }

  deleteItem = (id) => {
    this.setState(( { todoData } ) => {
      const ind = todoData.findIndex((el) => el.id === id)
      console.log(ind)
      const newArray = [ ...todoData.slice(0, ind), ...todoData.slice(ind + 1)]
      return {
        todoData: newArray
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]

      return {
        todoData: newArray
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const ind = arr.findIndex((el) => el.id === id)
    const oldItem = arr[ind]
    const newItem = {...oldItem, [propName]: !oldItem[propName]}
    return [ ...arr.slice(0, ind), newItem, ...arr.slice(ind + 1)]
  }

  onToggleImportant = (id) => {
    this.setState(( {todoData} ) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }
  

  onToggleDone = (id) => {
    this.setState(( {todoData} ) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  onSearchChange = (term) => {
    this.setState({ term })
  }

  search(items, term) {
    return items.filter((item) => {
      if (term.length === 0) {
        return items
      }
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
  }
  

  render () {

    const {todoData, term} = this.state

    const visibleItems = this.search(todoData, term) 
    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter />
        </div>

        <TodoList 
          todos={visibleItems}
          onDeleted={ this.deleteItem } 
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}  />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  };
}