const { BeforeAll, Before, AfterAll, After,setDefaultTimeout } = require('@cucumber/cucumber');
const {chromium , firefox, webkit } = require(`@playwright/test`);


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
            browser = await chromium.launch({ headless: true});
            break;
            }
    context = await browser.newContext();
    page = await context.newPage();
    
    //Make page available in steps
    this.page = page;
    
})

After(async function (scenario) {
    if(scenario.result.status === 'FAILED'){
        const screenshot = await this.page.screenshot();
        await this.attach(screenshot, 'image/png');
    }
    if(page) await page.close();
    if(context) await context.close();
    if(browser) await browser.close();
})
