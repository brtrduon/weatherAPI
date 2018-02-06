import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(cityData) {
        const name = cityData.city.name;
        const temps = cityData.list.map(weather => weather.main.temp);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        // const lon = cityData.city.coord.lon;
        // const lat = cityData.city.coord.lat;
        const { lon, lat } = cityData.city.coord;
        // ^ES6 syntax allows us to write lines 12 and 13 in a single line

        return (
            <tr key={name}>
                {/* <td>{name}</td> */}
                <td><GoogleMap lon={lon} lat={lat}/></td>
                <td><Chart data={temps} color='blue' units='K' /></td>
                <td><Chart data={pressures} color='green' units='hPa' /></td>
                <td><Chart data={humidities} color='black' units='%' /></td>
            </tr>
        )
    }

    render() {
        return (
            <table className='table table-hover'>
            <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature (K)</th>
                    <th>Pressure (hPa)</th>
                    <th>Humidity (%)</th>
                </tr>
            </thead>
            <tbody>
                {this.props.weather.map(this.renderWeather)}
            </tbody>
        </table>
        );
    }
}

function mapStateToProps({weather}) {
    return { weather }; // this ES6 syntax; exactly the same as { weather: weather }
}

export default connect(mapStateToProps)(WeatherList);