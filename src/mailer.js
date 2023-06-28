import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const CLIENT_ID = '957490936973-tnsm425ls419nmvuklc7qbctoguvergr.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; // Adjust the redirect URI if needed
const REFRESH_TOKEN = 'your-refresh-token';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'your-email@gmail.com', // Your Gmail email address
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: oAuth2Client.getAccessToken(),
  },
});

export default transporter;
