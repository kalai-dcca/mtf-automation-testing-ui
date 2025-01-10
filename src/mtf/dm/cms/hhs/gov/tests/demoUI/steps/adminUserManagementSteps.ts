import { Given, When, Then } from '../../../fixtures';

import { AdminUserManagementPage } from '../pages/adminUserManagementPage';

When('I add a system user', async ({page, homePage}) => {
    const au = new AdminUserManagementPage(page);
    await au.addSystemUser();
    
});

When('I delete the user', async ({page, homePage}) => {
    const au = new AdminUserManagementPage(page);
    await au.deleteUser();
    
});