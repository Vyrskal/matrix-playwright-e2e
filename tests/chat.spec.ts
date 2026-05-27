import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { ChatPage } from '../page-objects/ChatPage';

const USERNAME = process.env.TEST_USERNAME || 'test_username';
const PASSWORD = process.env.TEST_PASSWORD || 'super_secret_password';
const ROOM_NAME = process.env.TEST_ROOM_NAME || 'NEW TEST ROOM';

test.describe('Matrix Web Client E2E Tests', () => {
  test('User can login, create a room, and send a message', async ({ page }) => {
    test.slow();

    const loginPage = new LoginPage(page);
    const chatPage = new ChatPage(page);

    await test.step('1. Navigate to client and login', async () => {
      await loginPage.navigate();
      await loginPage.login(USERNAME, PASSWORD);
      await loginPage.handlePostLoginPopups();
    });

    await test.step('2. Create a new room', async () => {
      await chatPage.createRoomAndOpen(ROOM_NAME);
    });

    const uniqueMessageText = `Hello from Jamil! Automated test run at: ${new Date().toISOString()}`;    
    await test.step('3. Send a text message to the room', async () => {
      await chatPage.sendMessage(uniqueMessageText);
    });

    await test.step('4. Verify that the message is displayed and visible', async () => {
      await chatPage.verifyMessageDisplayed(uniqueMessageText);
    });

    await test.step('5. Additional Check: Verify session state in localStorage', async () => {
       const localStorageLength = await page.evaluate(() => localStorage.length);
       expect(localStorageLength).toBeGreaterThan(0);
    });
  });
});
