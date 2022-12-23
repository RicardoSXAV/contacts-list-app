import { expect } from 'detox';

describe('Contacts App', () => {
  it('should show a warning if the contacts permission was denied', async () => {
    await device.launchApp({
      launchArgs: { isDenied: true },
    });

    const warningText = element(
      by.text('The application does not work without access to contacts'),
    );

    await expect(warningText).toBeVisible();
  });

  it('should have a contacts list with a details page about each contact', async () => {
    await device.launchApp({
      launchArgs: { isDenied: false },
      newInstance: true,
    });

    const mockedContactName = element(by.text('Anna Haro'));
    const mockedContactEmail = element(by.text('anna-haro@mac.com'));
    const mockedContactButton = element(
      by.id('F57C8277-585D-4327-88A6-B5689FF69DFE'),
    );
    const contactDetailsHeader = element(by.text('Contact Details'));

    await expect(mockedContactName).toBeVisible();
    await mockedContactButton.tap();

    await expect(contactDetailsHeader).toBeVisible();
    await expect(mockedContactEmail).toBeVisible();
  });
});
