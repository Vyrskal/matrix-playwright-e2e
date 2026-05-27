import { Page, Locator, expect } from '@playwright/test';

export class ChatPage {
  readonly page: Page;
  readonly newConversationBtn: Locator;
  readonly newRoomMenuItem: Locator;
  readonly roomNameInput: Locator;
  readonly createRoomBtn: Locator;
  readonly messageComposerInput: Locator;
  readonly sendMessageBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.newConversationBtn = page.getByRole('button', { name: 'New conversation' });
    this.newRoomMenuItem = page.getByRole('menuitem', { name: 'New room' });
    this.roomNameInput = page.getByRole('textbox', { name: 'Name' });
    this.createRoomBtn = page.getByRole('button', { name: 'Create room' });
    
    this.messageComposerInput = page.getByRole('textbox', { name: 'Send a message…' });
    this.sendMessageBtn = page.getByRole('button', { name: 'Send message' });
  }

  async createRoomAndOpen(roomName: string) {
    await this.newConversationBtn.click();
    await this.newRoomMenuItem.click();
    await this.roomNameInput.fill(roomName);
    await this.createRoomBtn.click();
  }

  async sendMessage(messageText: string) {
    await this.messageComposerInput.fill(messageText);
    await this.sendMessageBtn.click();
  }

  async verifyMessageDisplayed(messageText: string) {
    await expect(this.page.getByText(messageText)).toBeVisible({ timeout: 10000 });
  }
}
