import React, { ChangeEvent, useState } from "react";

type ID = number;

type ListElement = {
  value: string;
  id: ID;
};

interface State {
  list: ListElement[];
  inputVal: string;
}

export default class TodoList extends React.Component {
  state: State;
  constructor(props: never) {
    super(props);
    this.state = {
      list: [],
      inputVal: ""
    };

    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleAppend = this.handleAppend.bind(this);
    this.handleListRemove = this.handleListRemove.bind(this);
  }

  handleTextInput(ev: ChangeEvent<HTMLInputElement>) {
    this.setState(
      (prev: State): State => ({
        ...prev,
        inputVal: ev.target.value
      })
    );
  }

  handleAppend() {
    if (this.state.inputVal.length <= 0) return;
    this.setState(
      (prev: State): State => ({
        ...prev,
        list: [...prev.list, { value: prev.inputVal, id: Date.now() }],
        inputVal: ""
      })
    );
  }

  handleListRemove(id: ID) {
    this.setState(
      (prev: State): State => ({
        ...prev,
        list: prev.list.filter((elem) => elem.id !== id)
      })
    );
  }

  render() {
    return (
      <div className="container">
        <h1>To-do list!</h1>
        <ol>
          {this.state.list.map((elem, i) => (
            <ListElement
              key={i}
              content={elem.value}
              removeCallback={() => this.handleListRemove(elem.id)}
            />
          ))}
          <li>
            <input
              type="text"
              placeholder="Write something!"
              value={this.state.inputVal}
              onChange={this.handleTextInput}
            />
            <button onClick={this.handleAppend}>Append!</button>
          </li>
        </ol>
      </div>
    );
  }
}

interface ListElementProps {
  content: string;
  removeCallback(): void;
}

function ListElement(props: ListElementProps) {
  let [hovered, SetHovered] = useState(false);
  return (
    <li
      className="elem"
      onMouseEnter={() => SetHovered(true)}
      onMouseLeave={() => SetHovered(false)}
    >
      <span>{props.content}</span>
      {hovered ? (
        <button className="button" onClick={props.removeCallback}>
          Remove!
        </button>
      ) : null}
    </li>
  );
}
