import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents setNumberOfEvents={() => { }} />);
    });
    test('has an element with "textbox" role', () => {
        expect(NumberOfEventsComponent.queryByRole('textbox')).toBeInTheDocument();
    });
    test('default value of the input field is 32', () => {
        expect(NumberOfEventsComponent.queryByRole('textbox')).toHaveValue('32');
    });
    test('value changes accordingly when user types', async () => {
        const NumberOfEvents = NumberOfEventsComponent.queryByRole('textbox');
        const user = userEvent.setup();
        await user.type(NumberOfEvents, '{backspace}{backspace}10');
        expect(NumberOfEvents).toHaveValue('10');
    });
})