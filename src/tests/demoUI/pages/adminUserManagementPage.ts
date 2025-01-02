import { Page } from '@playwright/test';
import { UIActionUtilities } from '../../../utilities/UIActionUtilities';
import { TestScenarioContext } from '../context/TestScenarioContext';


export class AdminUserManagementPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Locators
  
  private addButton = "//button[text()=' Add ']";
  private usernameTextBox = "//label[text()='Username']/ancestor::div[contains(@class, 'oxd-input-group')]/div/input";
  private employeeNameTextBox = "//label[text()='Employee Name']/ancestor::div[contains(@class, 'oxd-grid-item')]//input";
  private passwordTextBox = "//label[text()='Password']/ancestor::div[contains(@class, 'oxd-input-group')]/div/input";
  private confirmPasswordTextBox = "//label[text()='Confirm Password']/ancestor::div[contains(@class, 'oxd-input-group')]/div/input";
  private saveButton = "//button[text()=' Save ']";
  private userRoleDropdown = "(//i[contains(@class, 'oxd-icon bi-caret-down-fill oxd-select-text--arrow')])[1]";
  private adminListItem = "//div[@role='option']/span[text()='Admin']"
  private statusDropdown = "(//i[contains(@class, 'oxd-icon bi-caret-down-fill oxd-select-text--arrow')])[2]";
  private enabledListItem = "//div[@role='option']/span[text()='Enabled']"
  private employeeNameText = "//div[text()='Timothy Amiano']";
  private employeeNameListItem = "//span[text()='Timothy Lewis Amiano']";

  // Methods
  async addSystemUser() {
    
    const dataMap = TestScenarioContext.getTestCaseData();

    const employeeName = dataMap['Employee Name'];
    const username = dataMap['Username'];
    const password = dataMap['Password'];
    const confirmPassword = dataMap['Confirm Password'];

    await UIActionUtilities.clickElement(this.page.locator(this.addButton));
    await UIActionUtilities.clickElement(this.page.locator(this.userRoleDropdown));
    await UIActionUtilities.clickElement(this.page.locator(this.adminListItem));
    await UIActionUtilities.inputElement(this.page.locator(this.employeeNameTextBox), employeeName);
    await UIActionUtilities.clickElement(this.page.locator(this.employeeNameListItem));
    await UIActionUtilities.clickElement(this.page.locator(this.statusDropdown));
    await UIActionUtilities.clickElement(this.page.locator(this.enabledListItem));
    await UIActionUtilities.inputElement(this.page.locator(this.usernameTextBox), username);
    await UIActionUtilities.inputElement(this.page.locator(this.passwordTextBox), password);
    await UIActionUtilities.inputElement(this.page.locator(this.confirmPasswordTextBox), confirmPassword);
    await UIActionUtilities.clickElement(this.page.locator(this.saveButton));
    await UIActionUtilities.isElementVisible(this.page.locator(this.employeeNameText));

  }

}