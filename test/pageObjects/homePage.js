const {test,expect, selectors} = require(`@playwright/test`);
class HomePage{
    constructor(page){
        this.page = page
        this.login = page.locator('#gnav_login');
        this.loginButton = page.getByRole('link', {name: /log in/i });
    }

    async launchHomePage(){
        await this.page.goto("https://www.americanexpress.com/");
    }

    async clickLogin(){
        await  this.login.click();
        //await this.page.pause();
    }
}
module.exports = HomePage;