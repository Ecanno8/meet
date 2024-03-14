// src/App.js
import './App.css';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';


const App = () => {
  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents />
      <EventList />
    </div>
  );
}

export default App;