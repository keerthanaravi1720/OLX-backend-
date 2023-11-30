const admin = require('firebase-admin');

const serviceAccount = {
    "type": "service_account",
    "project_id": "login-b412f",
    "private_key_id": "36fc4cd90997181e9cab80cb830cab5e769d87df",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJC2Ue90UP4Q10\ndMBPzgquzjaYy3e5WGbYaRh3GBjaIhuS28Y1PE5gFlQzmzbya0A8n3gKY75aeeBo\n+bR7l+5xmHiBr4zejBNkpob7stX3Y2A4ALLcStu9nFyYMtbWF6Sp5CrFuH5MdDL8\n+juMbMubtxJ4rozGgbcgHeaJATUv1gAM0xm6qpsShElW7I2sUVmNlPP0e7n4rEeH\nWf3x/kImQjEX8WpbjJHB/r0BLQze4atpN1jQgmVvOnQmnZssXmgSUSPmxPHEsoYA\n3kp3ZQRrXMRdQijIA4ZcSXTUOzAxJltUJDgZF0ffA3eWnse4RObCvZ+Yjy1xN8pM\nJR77Ox37AgMBAAECggEAHR6h6HDPV4P083O/sS96W6RxwwLhlf6IcvsR+JoMa3f6\nP3TGykowXfmN+6WVOVqwhLdiZzrYRPmXOA1HB4nTly+K8NnRESD/5Bm8vnNCS6Fg\nu+vZ/E95cYbW4JKojH0DNDpguZ/F52QDSKIkAux1N1o2ejVqHYyHTkcWb6y1m/Zk\n9GYz3bQm3RGXQuZT2lunCxGF2UK4GkN2n0EYpsAZMCi1uyxiVjydEl4mLNEGH+Ts\nefSqyWqJrsJJONVNYCHHyKNcsVPhu5jjKgsgOHOBTY+hfsGoThHcTV42VE3xmScX\n8D2ZUO1B3u0oRwFvG2o7NVFQWTkoBxejTImIRw1vIQKBgQDmLu9mrRtaKgsJovz3\nw/0IDS/tf2jrD31jpgZCXv56NzrAAzEC8wLBneoMWSfb48sj3uDd4fDI7FuRsc4U\nbhe6NZnrUiTjWs7umHPaUrUx4vDzdrQ3OM+9lmC8mkphKufe50m9Vi3zjCCZSISz\npwR0KzoCT9Douf5xLgvuJm9/GwKBgQDfl9IU7Lz9lp/+cGCCkOWWdFZ9yTa/Z4Qd\nPJVIV11dKGhbR7E4ZhJxAm50P1l7xGF6lc8hpmDgV8aLv7Oz2aGv6fr4idJ/4oRA\nC3XhDxsVWJEqhT9XfqqA9n4iWPlmnNT3/JGDqQvonpYjFZHiNNdcZTQXwuXMNonh\nJIxn5iFqoQKBgB/BH9OpU9mnbShiLMW9at2+e/smlYG//EtP7xMe6bpQfjFY/1zp\ny1qMf2o+rmn+Tdrf92OEtOPy/1rlDYnx+iH9HQPCrEYVE/EEZQ8cU9TS+uyLVqc7\nliUQZr3+Bv7KnXw5qgmNpv8vOJwMzgm+o7Wm9PS2sBo69mgEsy6ibMU7AoGBAISE\nfLR+IvzBGw44GFsJ+aiURvbCHLqQZZLWZzu629Dss/z1nqlohaGI6WHoceaS25tF\n0r+E1oHgRAJrmdwMLnIOYPqQ5Lt6yxsSL8k1pL2gAlmLI6F9pxxL+zHsPdR9OxPH\nE49Oz4oNA7rDe/TvkHxoVtmGX6AK6ukPOlAR6thBAoGAVuZGHOX9tOKF6USWMxao\nKCLb+qjA6MIEybpF2vHsh8uReJjrAnFGbG+iBi7fqnarG7QibNkHQcsBTx1cjKz5\nD8Ta9jZjmTMUCjdwtEe3HUYxBb7PuVZCTq7P9VaItWCBBq2gwVRpINxj8ldYlX8q\ncGSaHoYpFMGMMH7rn4pMJ+4=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-55q8x@login-b412f.iam.gserviceaccount.com",
    "client_id": "111530834375897044094",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-55q8x%40login-b412f.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }; // Replace with your service account key path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://login-b412f-default-rtdb.firebaseio.com/', // Replace with your Firebase project's URL
});

module.exports = admin;
