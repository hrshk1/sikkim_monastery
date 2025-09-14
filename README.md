
# Sikkim Archive PWA

This project has been configured to be a Progressive Web App (PWA). This allows it to be installed on a user's device and to work offline.

## Deployment

To deploy the PWA, you will need to have the Firebase CLI installed. If you do not have it installed, you can install it with the following command:

```bash
npm install -g firebase-tools
```

Once you have the Firebase CLI installed, you can deploy the PWA with the following commands:

```bash
firebase login
firebase init
npm run build
firebase deploy
```

## Testing Offline

To test the PWA offline, you can use the Chrome DevTools. To do this, follow these steps:

1.  Open your website in Chrome.
2.  Open the Chrome DevTools by pressing `Ctrl+Shift+I` or `Cmd+Option+I`.
3.  Go to the "Application" tab.
4.  Go to the "Service Workers" tab.
5.  Check the "Offline" checkbox.
6.  Reload the page.

Your website should now be working offline. You can test this by disconnecting from the internet and trying to access the website.
