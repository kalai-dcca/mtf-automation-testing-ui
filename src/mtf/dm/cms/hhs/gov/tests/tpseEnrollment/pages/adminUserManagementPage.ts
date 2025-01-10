import { Page } from '@playwright/test';
import { UIActionUtilities } from '../../../commonUtilities/UIActionUtilities';
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
  private yesDeleteButton = "//button[text()=' Yes, Delete ']";
  private deleteSuccessMessage = "//div[@class='oxd-toast-content oxd-toast-content--success']";

  // Methods to generate dynamic locators
  private getEmployeeNameTextLocator(employeeName: string): string {
    return `//div[text()='${employeeName}']`;
  }

  private getDeleteButtonLocator(employeeName: string): string {
    return `//div[text()='${employeeName}']/ancestor::div[contains(@class, 'oxd-table-row')]//i[@class='oxd-icon bi-trash']`;
  }

  private getemployeeNameListItemLocator(employeeFullName: string): string {
    return `//span[text()='${employeeFullName}']`;
  }

  // Methods
  async addSystemUser() {
    
    const dataMap = TestScenarioContext.getTestCaseData();

    const employeeName = dataMap['Employee Name'];
    const employeeFullName = dataMap['Employee Full Name'];
    const username = dataMap['Username'];
    const password = dataMap['Password'];
    const confirmPassword = dataMap['Confirm Password'];

    await UIActionUtilities.clickElement(this.page.locator(this.addButton));
    await UIActionUtilities.clickElement(this.page.locator(this.userRoleDropdown));
    await UIActionUtilities.clickElement(this.page.locator(this.adminListItem));
    await UIActionUtilities.inputElement(this.page.locator(this.employeeNameTextBox), employeeName);
    await UIActionUtilities.clickElement(this.page.locator(this.getemployeeNameListItemLocator(employeeFullName)));
    await UIActionUtilities.clickElement(this.page.locator(this.statusDropdown));
    await UIActionUtilities.clickElement(this.page.locator(this.enabledListItem));
    await UIActionUtilities.inputElement(this.page.locator(this.usernameTextBox), username);
    await UIActionUtilities.inputElement(this.page.locator(this.passwordTextBox), password);
    await UIActionUtilities.inputElement(this.page.locator(this.confirmPasswordTextBox), confirmPassword);
    await UIActionUtilities.clickElement(this.page.locator(this.saveButton));
    await UIActionUtilities.isElementVisible(this.page.locator(this.getEmployeeNameTextLocator(employeeName)));

  }

  async deleteUser() {
    const dataMap = TestScenarioContext.getTestCaseData();
    const employeeName = dataMap['Employee Name'];
    await UIActionUtilities.clickElement(this.page.locator(this.getDeleteButtonLocator(employeeName)));
    await UIActionUtilities.clickElement(this.page.locator(this.yesDeleteButton));
    await UIActionUtilities.isElementVisible(this.page.locator(this.deleteSuccessMessage));
  }


}