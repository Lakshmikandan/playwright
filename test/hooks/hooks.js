const { BeforeAll, Before, AfterAll, After,setDefaultTimeout } = require('@cucumber/cucumber');
const {chromium , firefox, webkit } = require(`@playwright/test`);
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

let browser;
let context;
let page;
setDefaultTimeout(60 * 1000);
Before(async function() {
    console.log(`Execution Started`);

    const browserName = process.env.BROWSER || 'chromium';

    switch (browserName.toLocaleLowerCase()){
        case 'chrome':
            browser = await chromium.launch({
                channel: 'chrome',
                headless: true
            });
            break;
        case 'microsoftedge':
            browser = await chromium.launch({
                channel: 'msedge',
                headless: true
            });
            break;
        case 'firefox':
            browser = await firefox.launch({headless: true})    
            break;
        default:
            browser = await chromium.launch({ headless: false});
            break;
            }
    context = await browser.newContext({
    recordVideo: { dir: 'videos/' }
  });
    page = await context.newPage();
    
    //Make page available in steps
    this.page = page;
    
})

After(async function (scenario) {
    if(scenario.result.status === 'FAILED'){
        const screenshot = await this.page.screenshot();
        await this.attach(screenshot, 'image/png');

        const video = this.page.video();

    if (video) {
      const webmPath = await video.path();
      const mp4Path = webmPath.replace('.webm', '.mp4');

      try {
        execSync(`ffmpeg -i "${webmPath}" "${mp4Path}"`, { stdio: 'ignore' });
        await this.attach(
          `<a href="${mp4Path}" target="_blank">▶️ Watch failure video</a>`,
          'text/html'
        );
      } catch (err) {
        // fallback if ffmpeg is not installed
        await this.attach(
          `<a href="${webmPath}" target="_blank">▶️ Watch failure video (webm)</a>`,
          'text/html'
        );
      }
    }

    } 
    if(page) await page.close();
    if(context) await context.close();
    if(browser) await browser.close();
})
