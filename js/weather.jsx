import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import '../css/weather-icons.min.css';

const apiKey = "6f46d4d5fd648710bff4cf141677e29b";

class Weather extends React.Component {

    render() {
        return (
            <div className="info">
                {this.props.city && this.props.country &&
                <p><span>Location:</span> {this.props.city}, {this.props.country}</p>}
                {this.props.temperature && <p><span>Temperature:</span> {this.props.temperature} &#x2103;</p>}
                {this.props.pressure && <p><span>Air pressure:</span> {this.props.pressure} hPa</p>}
                {this.props.humidity && <p><span>Humidity:</span> {this.props.humidity}%</p>}
                {this.props.description && <p><span>Conditions:</span> {this.props.description}</p>}
                {this.props.error && <p>{this.props.error}</p>}
            </div>
        )
    }
}

class Form extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <input type="text" name="city" placeholder=" City . . ."/>
                <input type="text" name="country" placeholder=" Country . . ."/>
                <button>Get Weather</button>
            </form>
        )
    }
}


class Titles extends React.Component {

    render() {
        return (
            <div>
                <h1>Weather</h1>
                <h2>at the moment...</h2>
            </div>
        )
    }
}

class Image extends React.Component {

    render() {

        return (
            <div className="weather">
                <i className={`wi wi-owm${this.props.class}-${this.props.id}`}></i>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {

            city: undefined,
            country: undefined,
            temperature: undefined,
            pressure: undefined,
            humidity: undefined,
            description: undefined,
            id: undefined,
            icon: undefined,
            class: '',
            error: undefined
        }
    }

    getWeather = (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`).then(r => r.json()).then(data => {


            if (city && country) {

                this.setState({
                    city: data.name,
                    country: data.sys.country,
                    temperature: data.main.temp,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    id: data.weather[0].id,
                    icon: data.weather[0].icon,
                    class: '',
                    error: ""


                });
                if (this.state.icon[2] == "d") {

                    this.setState({
                        class: "-day"
                    })
                } else if (this.state.icon[2] == "n") {

                    this.setState({
                        class: "-night"
                    })
                }

            } else {
                this.setState({
                    city: undefined,
                    country: undefined,
                    temperature: undefined,
                    pressure: undefined,
                    humidity: undefined,
                    description: undefined,
                    id: undefined,
                    icon: undefined,
                    class: '',
                    error: "Please enter the localisation You are looking for..."

                });
            }

        }).catch(e => {
            console.log('Błąd!', e)
        });

    };


    render() {

        return (
            <div>
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className={`col-sm-6 image-container weather-${this.state.id}`}>
                                <Titles/>
                                <Image
                                    class={this.state.class}
                                    id={this.state.id}
                                />
                            </div>
                            <div className="col-sm-6 form-container">


                                <Weather
                                    city={this.state.city}
                                    country={this.state.country}
                                    temperature={this.state.temperature}
                                    pressure={this.state.pressure}
                                    humidity={this.state.humidity}
                                    description={this.state.description}
                                    id={this.state.id}
                                    error={this.state.error}

                                />
                                <Form getWeather={this.getWeather}/>
                            </div>
                        </div>
                    </div>
                </div>


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
