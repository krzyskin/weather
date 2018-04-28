import React from 'react';
import ReactDOM from 'react-dom';

const apiKey = "6f46d4d5fd648710bff4cf141677e29b";

class Weather extends React.Component {
 constructor(props){
        super(props);

    }
    render() {
        return (
           <div>Weather Component</div>
        )
     }
 }
class Form extends React.Component {

    render() {
        return (
            <form>
                <input type="text" placeholder="city..."/>
                <input type="text" placeholder="country..."/>
                <button>Get Weather</button>

            </form>
        )
     }
 }


class Titles extends React.Component {

    render() {
        return (
        <div>
            <h1>Weather finder</h1>
            <p>Find out temperature, conditions and more...</p>
        </div>
        )
     }
 }

class App extends React.Component {
    fetch(`http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}`).then(r => r.json())
    .then( data => {
    console.log( data );
    });
});
});
   
    render() {
        return (
            <div>
            <Titles/>
            <Form/>
            <Weather/>
            </div>
        )
     }
 }


document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});

