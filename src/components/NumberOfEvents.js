import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
    const [query, setQuery] = useState("32");
    const handleInputChanged = (event) => {
        const value = event.target.value;
        setQuery(value);
        setCurrentNOE(value);
    }
    return (
        <div id="number-of-events">
            <input type="text" className="textboxNumber"
                placeholder="Enter a number"
                value={query}
                onChange={handleInputChanged}
                data-testid="numberOfEventsInput"
            />
        </div>
    )
}
export default NumberOfEvents;