import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import axios from "axios";
import {useInterval} from "usehooks-ts";


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

    let loading = true;

    const [list, setList] = React.useState(initList);
    const [name, setName] = React.useState('');

    const refresh = async() => {
        const response = await axios.get('https://mockend.com/ARandomPotatoPerson/Queue-for-CS2050/posts')
        if (Array.isArray(response.data)) {
            setList(response.data);
            loading = false;
        }
    }

    useEffect(() => {
        refresh();
    })

    useInterval(() => {
        refresh();
        }, 1000
    )


    function clickRemove() {
        /*
        const tempList = [...list];
        tempList.shift();
        setList(tempList);
        */

    }

    function clickAdd(name) {
        axios.put('https://mockend.com/ARandomPotatoPerson/Queue-for-CS2050/posts/' + list.length, {
            name: name
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response.data)
            });
        refresh();
    }

    function textChange(event) {
        setName(event.target.value);
    }

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
        <div className="App">

            <AddPerson onClick={() => clickAdd(name)}/>
            <br></br>
            <input type="text" value={name} onChange={textChange}></input>
        </div>
                } />
                <Route path="testingError" element={<hi>Fuck Off </hi>}/>
                <Route path="TASite" element = {loading ?
                    <div className="App">

                        <RemovePerson onClick={() => clickRemove()}/>
                        <br></br>
                        <AddPerson onClick={() => clickAdd(name)}/>
                        <br></br>

                        <input type="text" value={name} onChange={textChange}></input>
                        <ul>
                            {list.map((item) => (
                                <li>{item.name}</li>
                            ))}
                        </ul>
                    </div>
                    : <div>Loading</div>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
