


// const express = require('express');
// const bodyParser = require('body-parser');
// const { PrismaClient } = require('@prisma/client');
// const twilio = require('twilio');



// const prisma = new PrismaClient();
// const app = express();
// const port = process.env.PORT || 1000;
// const client = twilio('AC9f514ccb5c47996dc4bca5f711539d25', '7302fe781c202bc25164bd1a7a5d3814');



// app.use(bodyParser.json());




// app.post('/create-user', async (req, res) => {
//   try {
//     const { username, password, phone } = req.body;

//     // Check if a user with the same username already exists
//     const existingUser = await prisma.user.findUnique({
//       where: {
//         username: username,
//       },
//     });

//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already exists' });
//     }

//     // Generate a random verification code (you can implement your own logic)
//     const verificationCode = Math.floor(1000 + Math.random() * 9000);

//     // Create the user in the database
//     const user = await prisma.user.create({
//       data: {
//         username,
//         password,
//         phone,
//         verificationCode,
//       },
//     });

//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Could not create user' });
//   }
// });





// // Login with OTP
// app.post('/login', async (req, res) => {
//   try {
//     const { username, phone } = req.body;

//     // Find the user by username and phone number
//     const user = await prisma.user.findUnique({
//       where: {
//         username,
//         phone,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Generate a random OTP
//     const otp = Math.floor(1000 + Math.random() * 9000);

//     // Format the phone number to E.164 format
//     const formattedPhoneNumber = `+91${user.phone}`; // Assuming it's an Indian phone number (replace '91' with the appropriate country code)

//     // Send the OTP via Twilio SMS with the formatted phone number
//     await client.messages.create({
//       body: `Your login OTP is: ${otp}`,
//       to: formattedPhoneNumber,
//       from: '+17173161063',
//     });

//     res.status(200).json({ message: 'OTP sent for login' });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ error: 'Login failed' });
//   }
// });






// app.post('/admin-send-otp', async (req, res) => {
//   try {
//     const { username, phone, customOtp } = req.body;

//     // Find the user by username and phone number
//     const user = await prisma.user.findUnique({
//       where: {
//         username,
//         phone,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Check if the custom OTP is provided and is a valid string
//     if (!customOtp || typeof customOtp !== 'string' || customOtp.length === 0) {
//       return res.status(400).json({ error: 'Invalid custom OTP' });
//     }

//     // Send the custom OTP via Twilio SMS
//     const formattedPhoneNumber = `+91${user.phone}`; // Assuming it's an Indian phone number (replace '91' with the appropriate country code)
    
//     await client.messages.create({
//       body: `Your custom OTP: ${customOtp}`,
//       to: formattedPhoneNumber,
//       from: '+17173161063', // Replace with your Twilio phone number
//     });

//     res.status(200).json({ message: 'Custom OTP sent by admin' });
//   } catch (error) {
//     console.error('Error sending custom OTP:', error);
//     res.status(500).json({ error: 'Failed to send custom OTP' });
//   }
// });








// // app.post('/logins', async (req, res) => {
// //   try {
// //     const { phone } = req.body;

// //     // Generate a random verification code (OTP)
// //     const verificationCode = Math.floor(1000 + Math.random() * 9000);

// //     // Store this OTP in Firebase Realtime Database or Firestore for later verification
// //     // This could be done using Firebase Admin SDK
// //     // Example using Realtime Database:
// //     const firebaseAdmin = require('firebase-admin');
// //     const serviceAccount = {
// //       "type": "service_account",
// //       "project_id": "leafy-container-400910",
// //       "private_key_id": "1a2ea3bfa422f3098c853eb9104d2192544364e3",
// //       "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDE2P2fNuvKI3sD\naxi/JSnT35r2mQr9yVFqrBLP/6jByAZEIO3VP5QQUrU1xCvJagpYhB4ROhgZn9+z\nDWzqeHR3V0f48Psm+kdglFY7SHmgP32KOsuAxxQrqCAhK2zYM4043orNR4NdSBjN\njXNlw0zp/5guNNLC7BmlOcgD4PMRx5jL0RkAe1fJY9RieyHyq/R9oquWuYaKKIWM\nzhha4N9yVcyAyhnTvt2UDYQYWCVUvAxyIwkEgq8npI502BZjRw+6/hvfmH61NTy0\nQ9goqAycdRsEb9PYyRLEDsU2u03YSDqECga8HD5N3VMNILYA2EE2WFTTybQvqWiT\nSnPitejjAgMBAAECggEAAu0pta+9CQss/X7rZimsLQR8F8ifrRuZYVx/ueYWZ3pM\n4yXM+cIeHLE2FQxx2c00EsVoDKAdLDUmjLfMejhI0JHHtdY5tAZXGeld1msvgufe\nutFAv3N2NwEi9SThoEQBiF2amUGqaZa0TUrNWXwLs5QQRzbG0vOfaZSDbWqIz1qH\n5rZbVyq9oAcnyQ5P8wvHPW4tA0f7mnXNDw1mMFcb3MMOtQnHlwfG7Bhmy3uPHcbs\ndgzpxhuxI6GbEiWmEwWCJJNeKsgL1m2UmVtOmGOThVt1SQjkVjph93CZm/67uGC/\nMy9EGDDbyWh5kiDhr+/9+cwYuzeo3s2/org2bm8Q4QKBgQDrzts7g98hm8AWsdfc\nC9VRZxWPa/CT9Q9siNRqj62S+p7E9qzxI49cH66sHfawHNaZIYPIDwxfefGMoa3n\nGPV0WpRiZQw4qBGUcRNz8nruLdekbaY4u1swCrfwXfE1whl1atzZUn60kXcBGxcq\ntv4863jdPcfMfr4n+uQZn5QYAwKBgQDVtBV14Io9zmxSqvaDAK+fOS2JFuVNe8s2\ne3x+HrrnmsLPEzjEUGUDvBHH5tgQkxZWtTyi4ZSsSvHo2Xc33SZJ0oYQdpOtop1U\nuT4DwZL1kLMaVqEYz4SWwZkwmfQ8UTtckSiIOzMGIcDlgauh0+GN5h1PxnYfsX32\nj1kzmV5FoQKBgQC/Na9D5TzLrdXnETKuNdI1/dbXw3kDINXu9kz4U6U1549Su4uk\nxWb8Fpy26F0elWPWK/0F/l3UFbeuh3PSTsTKIqDr4HA2iOIockCJ5neUJwwTQu5k\nVlgs7qQUfriXFNs8APkwJ9qiZMoQ1XzFoDksAOyyyeP3iFZ9aM4JkQKvLQKBgQCU\nCLlM/IwGoHWdFlzJBrKhY2RNsJSLBhQQ252zZ+olAams9C3An8g5vA+9IAXQBXPW\nAJnOYuEwMII+wFW7VvBs9u5zfRBzmU/PHrr8sxzwCppmxle17hp0rAtIBX2QQt0S\nFGO1avy/ZKZQ1XBlG3cFasAnQN0Wu0b8gvRRsA4DwQKBgCLS6l2enFaIhQjV47a9\n81vluu0UWk1o41tQe1bsgliZKKM33BxBKYqZng0vNKWl+PBlzdQRdQvNe/9kPd/o\nBmJIWGR2+d97dPgqctHWVSzrsOnYos5cF8lla3TsM2tN8pUcyvn2EWfkVVY33Pz1\nrR7PfWPTYn9S0pCSU3jA4lha\n-----END PRIVATE KEY-----\n",
// //       "client_email": "firebase-adminsdk-jhn2j@leafy-container-400910.iam.gserviceaccount.com",
// //       "client_id": "117959817536621930445",
// //       "auth_uri": "https://accounts.google.com/o/oauth2/auth",
// //       "token_uri": "https://oauth2.googleapis.com/token",
// //       "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
// //       "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jhn2j%40leafy-container-400910.iam.gserviceaccount.com",
// //       "universe_domain": "googleapis.com"
// //     }
    
// //     ;
// //     firebaseAdmin.initializeApp({
// //       credential: firebaseAdmin.credential.cert(serviceAccount),
// //       databaseURL: 'https://leafy-container-400910-default-rtdb.firebaseio.com/',
// //     });
// //     const db = firebaseAdmin.database();
// //     await db.ref(`otp/${phone}`).set(verificationCode.toString());

// //     // Send the OTP via Twilio
// //     await client.messages.create({
// //       body: `Your OTP is: ${verificationCode}`,
// //       to: `+${phone}`, // Ensure the phone number is in the correct format
// //       from: '+17173161063',
// //     });

// //     res.status(200).json({ message: 'OTP sent successfully' });
// //   } catch (error) {
// //     console.error('Error sending OTP:', error);
// //     res.status(500).json({ error: 'Could not send OTP' });
// //   }
// // });



// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });






// login//
// app.post('/login/confirm', async (req, res) => {
//   try {
//     const { otpToken } = req.body;

//     // Check if the submitted OTP token exists in the map
//     for (const [phone, storedOtpToken] of otpTokens) {
//       if (otpToken === storedOtpToken) {
//         // OTP token matched, remove it from storage
//         otpTokens.delete(phone);

//         // Fetch the user from the database based on the phone number
//         const user = await prisma.createuser.findFirst({
//           where: { phone },
//         });

//         if (!user) {
//           return res.status(404).json({ error: 'User not found' });
//         }

//         // Send a successful message with the username
//         return res.json({
//           message: 'Login successful ',
//           username: user.username, // Include the username of the user
//         });
//       }
//     }

//     // If the OTP token is not found or is invalid
//     res.status(401).json({ error: 'Invalid OTP token' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Login confirmation failed' });
//   }
// });



// login with email//

// app.post('/login-email', async (req, res) => {
//     try {
//       const { email } = req.body;
  
//       // Check if the user with the provided email exists in the database
//       const user = await prisma.createuser.findFirst({
//         where: { email },
//       });
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Generate an OTP-like token for login
//       const otpToken = generateOTP(6); // Generate a 6-character OTP-like token
  
//       // Store the OTP token in memory, associated with the user's email
//       otpTokens.set(email, otpToken);
  
//       // Send the OTP token to the user (you can implement email or SMS sending logic here)
  
//       res.json({ message: 'OTP sent successfully for login', otpToken });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Login failed' });
//     }
//   });
  
//   app.post('/login-email/confirm', async (req, res) => {
//     try {
//       const { otpToken } = req.body;
  
//       // Check if the submitted OTP token exists in the map
//       for (const [storedEmail, storedOtpToken] of otpTokens) {
//         if (otpToken === storedOtpToken) {
//           // OTP token matched, remove it from storage
//           otpTokens.delete(storedEmail);
  
//           // Fetch the user from the database based on the email associated with the OTP (optional)
//           const user = await prisma.createuser.findFirst({
//             where: { email: storedEmail },
//           });
  
//           // Send a welcome back message (with the username if user exists)
//           if (user) {
//             return res.json({
//               message: `Welcome back, ${user.username}!`,
//             });
//           } else {
//             return res.json({
//               message: 'Login successful',
//             });
//           }
//         }
//       }
  
//       // If the OTP token is not found or is invalid
//       res.status(401).json({ error: 'Invalid OTP token' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Login confirmation failed' });
//     }
//   });
  