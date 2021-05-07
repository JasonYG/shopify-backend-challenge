const puppeteer = require('puppeteer');

describe('Page Loads Correctly', () => {
    test('h1 is correct', async () => {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('http://localhost:3000');
        await page.waitForSelector('.Polaris-Header-Title');
        const h1 = await page.$('.Polaris-Header-Title');
        expect(await h1.evaluate(node => node.innerText)).toBe('ImageHub')

    })
})