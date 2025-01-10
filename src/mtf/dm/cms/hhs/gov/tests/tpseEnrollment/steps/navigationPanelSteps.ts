import { Given, When, Then } from '../../../fixtures';

import { NavigationPanelPage } from '../pages/navigationPanelPage';

When('I navigate to the Admin page', async ({page, homePage}) => {
    const np = new NavigationPanelPage(page);
    await np.navigatetoAdminPage();
});