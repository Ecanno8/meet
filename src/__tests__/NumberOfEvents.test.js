import NumberOfEvents from "../components/NumberOfEvents";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} />)
    })
    test('has an element with role of a textbox', () => {
        const numberTextbox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberTextbox).toBeInTheDocument();
        expect(numberTextbox).toHaveClass('textboxNumber');
    });
    test('by default, number of event is listed 32', () => {
        const numberTextbox = NumberOfEventsComponent.getByPlaceholderText('Enter a number');
        expect(numberTextbox).toHaveValue("32");
    });
    test('updates number of events when user types', async () => {
        const numberTextbox = NumberOfEventsComponent.queryByRole('textbox');
        await userEvent.type(numberTextbox, "{backspace}{backspace}10");
        expect(numberTextbox.value).toBe("10");
    });
});