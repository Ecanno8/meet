import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch allLocations={[]} />);
    });

    test('suggestions list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions when city textbox gains focus', async () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await userEvent.click(cityTextBox);
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });

    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await userEvent.type(cityTextBox, 'Berlin');

        const suggestions = allLocations
            ? allLocations.filter(location => {
                if (typeof location !== 'string') return false;
                return location.toUpperCase().includes(cityTextBox.value.toUpperCase());
            })
            : [];

        const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        suggestions.forEach((suggestion, index) => {
            expect(suggestionListItems[index].textContent).toBe(suggestion);
        });
    });
});

describe('<CitySearch /> integration', () => {
    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch allLocations={[]} setCurrentCity={() => { }} />);
    });

    test('renders suggestions list when the app is rendered', async () => {
        const AppContainer = render(<App />);
        const citySearchInput = within(AppContainer.getByTestId('city-search')).getByRole('textbox');
        await userEvent.click(citySearchInput);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        const suggestionListItems = within(AppContainer.getByTestId('city-search')).queryAllByRole('listitem');
        expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(
            <CitySearch allLocations={allLocations} setCurrentCity={() => { }} />
        );

        const cityTextBox = CitySearchComponent.getByRole('textbox');
        await userEvent.type(cityTextBox, 'Berlin');

        const berlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];
        await userEvent.click(berlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(berlinGermanySuggestion.textContent);
    });
});


