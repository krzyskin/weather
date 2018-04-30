import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import regeneratorRuntime from "regenerator-runtime";

const apiKey = "6f46d4d5fd648710bff4cf141677e29b";

class Weather extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                {this.props.city && this.props.country && <p>Location: {this.props.city}, {this.props.country}</p>}
                {this.props.temperature && <p>temperature: {this.props.temperature}</p>}
                {this.props.humidity && <p>humidity: {this.props.humidity}</p>}
                {this.props.description && <p>conditions: {this.props.description}</p>}
                {this.props.error && <p>{this.props.error}</p>}
            </div>
        )
    }
}

class Form extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <input type="text" name="city" placeholder="city..."/>
                <input type="text" name="country" placeholder="country..."/>
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
    constructor(props) {
        super();
        this.state = {
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: undefined
        }
    }

    getWeather = (e) => {
        e.preventDefault();
        const city = e.target[0].value;
        const country = e.target[1].value;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metriC`).then(r => r.json()).then(data => {


            if (city && country) {
                console.log(data);

                this.setState({
                    temperature: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    error: ""
                });
            } else {
                this.setState({
                    temperature: undefined,
                    city: undefined,
                    country: undefined,
                    humidity: undefined,
                    description: undefined,
                    error: "Please enter the values"
                });
            }
        }).catch(e => {
            console.log('Błąd!', e)
        });
    }

    render() {
        return (
            <div>
                <Titles/>
                <Form getWeather={this.getWeather}/>
                <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                />
            </div>
        )
    }
}


document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});

/*
ANOTHER WAY:

getWeather = async (e) => {
  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`);
  const data = await api_call.json();
*/