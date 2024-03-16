// src/__tests__/App.test.js

import { render, within } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import App from '../App';

describe('<App /> component', () => {
    let AppDOM;
    beforeEach(() => {
        AppDOM = render(<App />).container.firstChild;
    })

    test('renders list of events', () => {
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
    });

    test('render CitySearch', () => {
        expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });

    test('renders number of events', () => {
        expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
    });
});