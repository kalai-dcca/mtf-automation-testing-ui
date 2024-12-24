import { Given, When, Then } from '../../../fixtures';

import { LoginManufacturerPage } from '../pages/loginManufacturerPage';

Given('I login with a valid User', async ({page, homePage}) => {
    const lp = new LoginManufacturerPage(page);
   await lp.open();
   await lp.processLogin();
});
