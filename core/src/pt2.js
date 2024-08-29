// endpoints untuk setiap oauth provider (google, apple, facebook) //
// direct handling of oauth request & respon //
// demi apapun, jangan diseriusin ini bukanlah untuk eksekusi script //

const express = require('express');
const https = require('https');
const querystring = require('querystring');
const app = express();
const PORT = 3000;

const GOOGLE_CLIENT_ID = '-google-client-id';
const GOOGLE_CLIENT_SECRET = '-google-client-secret';
const APPLE_CLIENT_ID = '-apple-client-id';
const APPLE_CLIENT_SECRET = '-apple-client-secret';
const FACEBOOK_CLIENT_ID = '-facebook-client-id';
const FACEBOOK_CLIENT_SECRET = '-facebook-client-secret';

const UNTUK_CALLBACK = 'http://localhost:3000/auth/callback';

app.get('/', (req, res) => {
    res.send('Welcome to the jungle lol!');
});

// endpoint setiap provider //
app.get('/auth/google', (req, res) => {
    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;
    res.redirect(googleAuthURL);
});

app.get('/auth/apple', (req, res) => {
    const appleAuthURL = `https://appleid.apple.com/auth/authorize?client_id=${APPLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=name%20email`;
    res.redirect(appleAuthURL);
});

app.get('/auth/facebook', (req, res) => {
    const facebookAuthURL = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email,public_profile`;
    res.redirect(facebookAuthURL);
});

app.get('/auth/callback', async (req, res) => {
    const { code, state } = req.query;

    if (!code) {
        return res.status(400).send('Missing code parameter.');
    }

    const provider = state ? state : 'unknown';
    let tokenResponse;

    try {
        switch (provider) {
            case 'google':
                tokenResponse = await exchangeCodeForTokenGoogle(code);
                break;
            case 'apple':
                tokenResponse = await exchangeCodeForTokenApple(code);
                break;
            case 'facebook':
                tokenResponse = await exchangeCodeForTokenFacebook(code);
                break;
            default:
                return res.status(400).send('Unknown provider.');
        }

        const userInfo = await fetchUserInfo(provider, tokenResponse);
        res.send(`User info: ${JSON.stringify(userInfo)}`);
    } catch (error) {
        res.status(500).send('Error during authentication: ' + error.message);
    }
});

async function exchangeCodeForTokenGoogle(code) {
    const postData = querystring.stringify({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
    });

    const options = {
        hostname: 'oauth2.googleapis.com',
        path: '/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
        },
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => resolve(JSON.parse(data)));
        });
        req.on('error', (e) => reject(e));
        req.write(postData);
        req.end();
    });
}

async function exchangeCodeForTokenApple(code) {
    // Apple token exchange logic (sama seperti google)
    return {};
}

async function exchangeCodeForTokenFacebook(code) {
    const postData = querystring.stringify({
        code,
        client_id: FACEBOOK_CLIENT_ID,
        client_secret: FACEBOOK_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
    });

    const options = {
        hostname: 'graph.facebook.com',
        path: `/v11.0/oauth/access_token?${postData}`,
        method: 'GET',
    };

    return new Promise((resolve, reject) => {
        https.get(options, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', (e) => reject(e));
    });
}

async function fetchUserInfo(provider, tokenResponse) {
    let userInfoURL;

    switch (provider) {
        case 'google':
            userInfoURL = 'https://www.googleapis.com/oauth2/v3/userinfo';
            break;
        case 'apple':
            userInfoURL = 'https://appleid.apple.com/auth/userinfo';
            break;
        case 'facebook':
            userInfoURL = `https://graph.facebook.com/me?fields=id,name,email&access_token=${tokenResponse.access_token}`;
            break;
        default:
            throw new Error('entitas tidak dikenal');
    }

    return new Promise((resolve, reject) => {
        https.get(userInfoURL, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', (e) => reject(e));
    });
}

app.listen(PORT, () => {
    console.log(`Server hidup di http://localhost:${PORT}`);
});

/// aku tidak tahan lagi ///
/// seseorang tolong aku ///