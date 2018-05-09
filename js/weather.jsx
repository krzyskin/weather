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
                <h1>Weather</h1>
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
        //{this.props.icon && <img  src={`http://openweathermap.org/img/w/${this.props.icon}.png`} className="weather-image"/>}

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
            id: undefined,
            icon:undefined,
            class:'',
            error: undefined
        }
    }

    getWeather = (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`).then(r => r.json()).then(data => {


            if (city && country) {
                console.log(data);

                this.setState({
                    temperature: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    id: data.weather[0].id,
                    icon:data.weather[0].icon,
                    class:'',
                    error: ""


                });
                if(this.state.icon[2]=="d"){
                    console.log("dzień");
                    this.setState({
                        class: "-day"
                    })
                }else if(this.state.icon[2]=="n"){
                    console.log("noc");
                    this.setState({
                        class: "-night"
                    })
                }



            } else {
                this.setState({
                    temperature: undefined,
                    city: undefined,
                    country: undefined,
                    humidity: undefined,
                    description: undefined,
                    id: undefined,
                    icon: undefined,
                    class:'',
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
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className={`col-sm-5 weather-${this.state.id}`}>
                                    <div>
                                        <Titles/>
                                        <Image  class={this.state.class}
                                                id={this.state.id}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-7 form-container">
                                    <Form getWeather={this.getWeather}/>

                                    <Weather
                                        temperature={this.state.temperature}
                                        city={this.state.city}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
                                        id={this.state.id}
                                        error={this.state.error}

                                    />
                                </div>
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

/*
ANOTHER WAY:
import regeneratorRuntime from "regenerator-runtime";


getWeather = async (e) => {
  e.preventDefault();
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`);
  const data = await api_call.json();
*/