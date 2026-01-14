const { Given, When, Then} = require("@cucumber/cucumber");
const HomePage = require("../pageObjects/homePage");

let homePage;
Given('I open the example page', async function () {
    homePage = new HomePage(this.page);
    await homePage.launchHomePage();
});

Then('I should see the title {string}', async function (string) {
    
});

Then('I click on the Login button', async function () {
    await homePage.clickLogin();
});