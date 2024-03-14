import { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents }) => {
    const [eventNumber, setEventNumber] = useState('32');
    const handleInputChanged = (event) => {
        const value = event.target.value;
        setEventNumber(value);
        setNumberOfEvents(value);
    }
    return (
        <div id="number-of-events">
            <input
                type="text"
                value={eventNumber}
                onChange={handleInputChanged}
            />
        </div>
    )
}

export default NumberOfEvents;