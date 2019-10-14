const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const readline = require('readline');
const randomUseragent = require('random-useragent');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('', (req, res) => {
  console.log('Username :' + req.query.username);
  console.log('Password :' + '*********');
  console.log('Number :' + req.query.number);

  user = req.query.username;
  pass = req.query.password;
  reqno = req.query.number;
  force = req.query.code;
  reqno = reqno / 10;
  reqno = Math.round(reqno);

  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized']
    });
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
      const originalQuery = window.navigator.permissions.query;
      return (window.navigator.permissions.query = parameters =>
        parameters.name === 'notifications'
          ? Promise.resolve({ state: Notification.permission })
          : originalQuery(parameters));
    });
    const userAgent =
      'Mozilla/5.0 (X11; Linux x86_64)' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false
      });
    });
    await page.setUserAgent(userAgent);
    let element, formElement, tabs;
    await page.goto(
      `https://www.instagram.com/accounts/login/?source=auth_switcher`,
      { waitUntil: 'networkidle0' }
    );

    await sleep(2000);

    element = await page.$x(`//*[@name="username"]`);
    await element[0].click();

    element = await page.$x(`//*[@name="username"]`);
    await element[0].type(user);

    console.log('Username Done');

    element = await page.$x(`//*[@name="password"]`);
    await element[0].type(pass);

    console.log('Password Done');

    await sleep(1000);

    element = await page.$x(
      `//span[@id='react-root']/section/main/div/article/div/div/div/form/div[4]/button/div`
    );
    await element[0].click();

    console.log('Login');

    // await sleep(6000);
    await sleep(2000);

    try {
      await page.waitForSelector('.vqibd > .GA2q- > .JraEb > .idhGk > ._5f5mN');
      await page.click('.vqibd > .GA2q- > .JraEb > .idhGk > ._5f5mN');

      await sleep(2000);
      // await sleep(4000);

      console.log('Insert the Code');

      element = await page.$x(`//*[@name="security_code"]`);
      await element[0].click();
      await element[0].type(force);

      console.log('Check the Area');
      // element = await page.$x(`//*[@name="security_code"]`);
      // await element[0].type(code);

      // await sleep(4000);

      await page.waitForSelector('.vqibd > .GA2q- > .JraEb > .idhGk > ._5f5mN');
      await page.click('.vqibd > .GA2q- > .JraEb > .idhGk > ._5f5mN');

      // await sleep(4000);
    } catch (e) {
      console.log('Non Suspicious Login');
    }

    /*
    
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('https://www.instagram.com/challenge/5630492840/4SwmV1lLPk/')
  
  await page.setViewport({ width: 1536, height: 754 })
  
  await page.waitForSelector('.vqibd > .GA2q- > .JraEb > .idhGk > .\_5f5mN')
  await page.click('.vqibd > .GA2q- > .JraEb > .idhGk > .\_5f5mN')
  
  await page.waitForSelector('.vqibd #security_code')
  await page.click('.vqibd #security_code')
  
  await page.waitForSelector('.vqibd > .GA2q- > .JraEb > .idhGk > .\_5f5mN')
  await page.click('.vqibd > .GA2q- > .JraEb > .idhGk > .\_5f5mN')
  
  await navigationPromise
  
  await browser.close()
})()
    */

    /*  Full bypass of
    const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('https://www.instagram.com/challenge/5630492840/10KW5tMNbu/')
  
  await page.setViewport({ width: 1536, height: 754 })
  
  await page.waitForSelector('.vqibd > .GA2q- > .JraEb > .idhGk > .\_5f5mN')
  await page.click('.vqibd > .GA2q- > .JraEb > .idhGk > .\_5f5mN')
  
  await page.waitForSelector('.vqibd #security_code')
  await page.click('.vqibd #security_code')
  
  await page.waitForSelector('.vqibd > .GA2q- > .JraEb > .idhGk > .\_5f5mN')
  await page.click('.vqibd > .GA2q- > .JraEb > .idhGk > .\_5f5mN')
  
  await navigationPromise
  
  await browser.close()
})()

    */

    await sleep(2000);
    try {
      element = await page.$x(
        `(.//*[normalize-space(text()) and normalize-space(.)='Know right away when people follow you or like and comment on your photos.'])[1]/following::button[2]`
      );
      await element[0].click();
      console.log('Notification Bypassed');
    } catch (e) {
      console.log('Notification Excepted');
    }
    await sleep(2000);

    var count = 0;
    while (count < reqno) {
      count++;
      console.log(' Counter Started ');
      try {
        await sleep(2000);
        await page.waitForSelector(
          '._47KiJ > .XrOey > ._0ZPOP > ._8-yf5 > path'
        );
        await page.click('._47KiJ > .XrOey > ._0ZPOP > ._8-yf5 > path');

        console.log('Heart Target');
      } catch (e) {
        console.log('Wrong Password: Send another request');
        return res.send('Wrong Password' + '\nTry Again');
      }

      await sleep(10000);
      element = await page.$x(`//div[4]/div/div/div/div/div[2]`);
      await element[0].click();

      console.log('Approval List');

      await sleep(4000);

      try {
        element = await page.$x(`//div[3]/div/div/button`);
        // await element[0].click();
        for (step = 2; step < 11; step++) {
          element = await page.$x(`//div[` + step + `]/div[3]/div/div/button`);
          // await element[0].click();
          console.log('Step ', step, 'click');
        }
      } catch (e) {
        console.log('no more requests available');

        await sleep(4000);

        await browser.close();

        return res.send('No more requests available');
      }

      // await sleep(4000);
      // element = await page.$x(`//div[3]/div/div/button`);
      // await element[0].click();

      await sleep(4000);
      await page.waitForSelector('._47KiJ > .XrOey > ._0ZPOP > ._8-yf5 > path');
      await page.click('._47KiJ > .XrOey > ._0ZPOP > ._8-yf5 > path');
      // element = await page.$x(`//div[3]/div/div[2]/a/span`);
      // await element[0].click();

      console.log('Heart Target -2');
    }
    console.log('Task Succesfully Completed');
    await browser.close();
    return res.send('Task Succesfully Completed');
  })();
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
