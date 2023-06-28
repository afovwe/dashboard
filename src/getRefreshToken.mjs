import { google } from 'googleapis';

const CLIENT_ID = '957490936973-tnsm425ls419nmvuklc7qbctoguvergr.apps.googleusercontent.com';
const CLIENT_SECRET = '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';

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://mail.google.com/'],
});

console.log('Authorize this app by visiting this URL:', authUrl);
