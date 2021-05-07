const puppeteer = require('puppeteer');
const path = require('path')

const filePath = path.relative(process.cwd(), __dirname + "\\test-image.jpg");

describe('Upload, sell, buy image process works', () => {
    test('Upload image', async () => {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('http://localhost:3000');
        const fileUploadElement = await page.$("input[type=file]");
        await fileUploadElement.uploadFile(filePath);
        
        // Fill in text fields
        await page.waitForSelector('#PolarisTextField2');
        await page.click('#PolarisTextField2');
        await page.type('#PolarisTextField2', 'test-username');

        await page.waitForSelector('#PolarisTextField4');
        await page.click('#PolarisTextField4');
        await page.type('#PolarisTextField4', 'Test Image');

        await page.waitForSelector('#PolarisTextField6');
        await page.click('#PolarisTextField6');
        await page.type('#PolarisTextField6', '200');

        // Click Save button
        await page.click("button[type=submit]");

        // Verify the toast popped up
        await page.waitForSelector(".Polaris-Frame-Toast");
        const toast = await page.$('.Polaris-Frame-Toast');
        expect(await toast.evaluate(node => node.innerText)).toBe('Successfully saved image!')


    }),
    test('Sell image', async () => {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/sell');
        
        // Fill in username field
        await page.waitForSelector('#PolarisTextField2');
        await page.click('#PolarisTextField2');
        await page.type('#PolarisTextField2', 'test-username');

        // Click Enter button
        await page.click("button[type=submit]");

        await page.waitForSelector('.Polaris-MediaCard__PrimaryAction');

        // Click Sell this image
        await page.click('.Polaris-MediaCard__PrimaryAction');

        // Verify the toast popped up
        await page.waitForSelector(".Polaris-Frame-Toast");
        const toast = await page.$('.Polaris-Frame-Toast');
        expect(await toast.evaluate(node => node.innerText)).toBe('Successfully put up for sale!')


    }, 10000),
    test('Buy image', async () => {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/buy');

        // Get Buy this image button
        const [button] = await page.$x("//button[contains(., 'Buy this image')]");
        if (button) {
            await button.click();
        }

        // Verify the toast popped up
        await page.waitForSelector(".Polaris-Frame-Toast");
        const toast = await page.$('.Polaris-Frame-Toast');
        expect(await toast.evaluate(node => node.innerText)).toBe('Successfully purchased!')


    }, 10000)
})