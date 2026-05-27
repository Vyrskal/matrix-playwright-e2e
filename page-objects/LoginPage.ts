import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly signInLink: Locator;
  readonly continueButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.getByRole('link', { name: 'Sign in' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.usernameInput = page.getByRole('textbox', { name: 'Username or Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
  }

  async navigate() {
    await this.page.goto('/#/welcome');
  }

  async login(username: string, password: string) {
    await this.signInLink.click();
    
    await this.continueButton.click();
    
    await this.usernameInput.click();
    await this.usernameInput.fill(username);    
    await this.passwordInput.fill(password);
    
    await this.continueButton.click();
  }
  
  async handlePostLoginPopups() {
    // Helper function to safely click popups without failing the test if they don't appear
    const safeClick = async (locator: Locator) => {
        try {
            await locator.waitFor({ state: 'visible', timeout: 30000 });
            await locator.click();
        } catch (e) {
            // Ignore if popup is not present
        }
    };

    // Sequence of potential post-login verifications/onboarding popups
    await safeClick(this.page.getByRole('button', { name: 'Continue' }));
    await safeClick(this.page.getByRole('button', { name: 'Skip verification for now' }));
    await safeClick(this.page.getByRole('button', { name: 'I\'ll verify later' }));
    await safeClick(this.page.getByRole('button', { name: 'Later' }));
    await safeClick(this.page.getByRole('button', { name: 'Dismiss' }));
    
  }
}
