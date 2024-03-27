import puppeteer from 'puppeteer';

// Increase Jest timeout
describe('show/hide an event details', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/meet');
        // Wait for event elements to load
        await page.waitForSelector('.event');
    });

    afterAll(async () => {
        await browser.close();
    });

    // SCENARIO 1
    test('An event element is collapsed by default', async () => {
        // Wait for event details to load
        await page.waitForSelector('.event .details', { hidden: true });

        // Pause execution here to inspect the state
        await page.evaluate(() => { debugger; });

        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });

    // SCENARIO 2
    test('User can expand an event to see its details', async () => {
        await page.click('.event .details-button');
        // Wait for event details to become visible
        await page.waitForSelector('.event .details', { visible: true });
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });

    // SCENARIO 3
    test('User can collapse an event to hide details', async () => {
        await page.click('.event .details-button');
        // Wait for event details to become hidden
        await page.waitForSelector('.event .details', { hidden: true });
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });
});