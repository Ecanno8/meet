import { render } from '@testing-library/react';
import mockData from '../mock-data';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';


describe('<Event /> component', () => {
    let EventComponent;
    const event = mockData[0];
    beforeEach(() => {
        EventComponent = render(<Event event={event} />);
    });
    test('Event title present', () => {
        expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
    });

    test('Event created time present', () => {
        expect(EventComponent.queryByText(event.created)).toBeInTheDocument();

    });

    test('Event location present', () => {
        expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
    });

    test('Button show details present', () => {
        expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
    });

    test('Events details section should be hidden by default', () => {
        const details = EventComponent.container.querySelector('.details');
        expect(details).not.toBeInTheDocument();
    });
    test('renders event details button with the title (show details)', () => {
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });
    test('shows details section when the user clicks on (show details) button', async () => {
        const user = userEvent.setup();
        const showDetailsButton = EventComponent.queryByText("show details");
        await user.click(showDetailsButton);
        const details = EventComponent.container.querySelector('.details');
        expect(details).toBeInTheDocument();
    })
    test('hide details section when the user clicks on (hide details) button', async () => {
        const user = userEvent.setup();
        const hideDetailsButton = EventComponent.queryByText("hide details");
        await user.click(hideDetailsButton);
        const details = EventComponent.container.querySelector('.details');
        expect(details).not.toBeInTheDocument();
    })
});