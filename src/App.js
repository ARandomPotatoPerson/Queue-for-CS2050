import React from 'react';
import './App.css';

function RemovePerson(props) {
    return (
        <button className = "button" onClick={props.onClick}>
            Remove Person
        </button>
    )
}

function AddPerson(props) {
    return (
        <button className = "button" onClick={props.onClick}>
            Add Person
        </button>
    )
}

const initList = [];

function App() {

    const [list, setList] = React.useState(initList);
    const [name, setName] = React.useState('');

    function textChange(event) {
        setName(event.target.value);
    }

    function clickRemove() {
        const tempList = [...list];
        tempList.shift();
        setList(tempList);
    }

    function clickAdd(name) {
        const tempList = list.concat({name: name});
        setList(tempList);
    }

    return(
        <div className="App">
            <RemovePerson onClick={() => clickRemove()}/>
            <AddPerson onClick={() => clickAdd(name)}/>
            <input type="text" value={name} onChange={textChange}></input>
            <ul>
                {list.map((item) => (
                    <li>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
