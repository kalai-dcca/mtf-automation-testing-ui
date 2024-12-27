import { Given, When, Then } from '../../../fixtures';

import { LoginPage } from '../../shared/pages/loginPage';


Given('I login with a valid User', async ({ page }) => {
    const lp = new LoginPage(page);
    await lp.open();
    await lp.login();
});