const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: { width: 1920, height: 1080 }, args: ['--start-maximized'] });
    const page = await browser.newPage();
    let element, formElement, tabs;

    await page.goto(`https://www.instagram.com/`, { waitUntil: 'networkidle0' });

	element = await page.$x(`//a[contains(text(),'Log in')]`);
	await element[0].click();
	await page.waitForNavigation();

	element = await page.$x(`//*[@name="username"]`);
	await element[0].click();

	element = await page.$x(`//*[@name="username"]`);
	await element[0].type(`chester_king___`);

	element = await page.$x(`//*[@name="password"]`);
	await element[0].type(`testPass1234`);

	element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Instagram'])[1]/following::form[1]`);
	await element[0].click();

	element = await page.$x(`//*[@name="password"]`);
	await element[0].type(`Leydig.01`);

	element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Instagram'])[1]/following::form[1]`);
	await element[0].click();

	element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Show'])[1]/following::div[2]`);
	await element[0].click();

	element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='Phone: +91 ***** ***48'])[1]/following::button[1]`);
	await element[0].click();

	element = await page.$x(`//*[@id="security_code"]`);
	await element[0].click();

	element = await page.$x(`//*[@id="security_code"]`);
	await element[0].type(`382901`);

	element = await page.$x(`(.//*[normalize-space(text()) and normalize-space(.)='–'])[6]/following::button[1]`);
	await element[0].click();
    await browser.close();
})();
