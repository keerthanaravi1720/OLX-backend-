








// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();
// const app = express();
// const PORT = process.env.PORT || 1000;
// const SECRET_KEY = 'your-secret-key';

// app.use(bodyParser.json());



// // Create a mapping of phone numbers to OTP tokens (in-memory storage for demonstration)
// const otpTokens = new Map();

// // Function to generate a random OTP-like string
// function generateOTP(length) {
//   const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   let otp = '';

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     otp += characters.charAt(randomIndex);
//   }

//   return otp;
// }




// app.post('/register', async (req, res) => {
//   try {
//     const { username, email, phone, password } = req.body;

//     // Generate an OTP-like token
//     const otpToken = generateOTP(6); // Generate a 6-character OTP-like token

//     // Create a new user record in the database
//     const newUser = await prisma.createuser.create({
//       data: {
//         username,
//         email,
//         phone,
//         password,
//       },
//     });

//     // Store the OTP token in memory, associated with the user's phone number
//     otpTokens.set(phone, otpToken);

//     // Send the OTP token to the user (you can implement email or SMS sending logic here)

//     res.json({ message: 'OTP sent successfully', otpToken,  }); // Include otpToken in the response
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });


// app.post('/register/confirm', async (req, res) => {
//   try {
//     const { otpToken } = req.body;

//     // Initialize a variable to store the user's username
//     let username = '';

//     // Check if the submitted OTP token exists in the map
//     for (const [phone, storedOtpToken] of otpTokens) {
//       if (otpToken === storedOtpToken) {
//         // Registration confirmed, remove the OTP token from storage
//         otpTokens.delete(phone);

//         // Fetch the user's username from the database based on the phone number
//         const user = await prisma.createuser.findFirst({
//           where: { phone },
//         });

//         if (user) {
//           username = user.username;
//         }

//         // Optionally, you can mark the user as "verified" in your database
//         // For example, if you have a Prisma model:
//         // const user = await prisma.user.update({
//         //   where: { phone },
//         //   data: { verified: true },
//         // });

//         return res.json({
//           message: `Registration confirmed successfully. Welcome, ${username}!`,
//         });
//       }
//     }

//     // If the OTP token is not found or is invalid
//     res.status(401).json({ error: 'Invalid OTP token' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Registration confirmation failed' });
//   }
// });






// // login//



// app.post('/login', async (req, res) => {
//   try {
//     const { phone } = req.body;

//     // Check if the user with the provided phone number exists in the database
//     const user = await prisma.createuser.findFirst({
//       where: { phone },
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Generate an OTP-like token for login
//     const otpToken = generateOTP(6); // Generate a 6-character OTP-like token

//     // Store the OTP token in memory, associated with the user's phone number
//     otpTokens.set(phone, otpToken);

//     // Send the OTP token to the user (you can implement email or SMS sending logic here)

//     res.json({ message: 'OTP sent successfully for login', otpToken });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Login failed' });
//   }
// });



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

//         // Send a welcome back message with the username
//         return res.json({
//           message: `Welcome back, ${user.username}!`,
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




// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






// const express = require('express');
// const bodyParser = require('body-parser');
// const { PrismaClient } = require('@prisma/client');
// const authRoutes = require('./routes/authRoutes');

// const prisma = new PrismaClient();
// const app = express();
// const cors = require('cors');
// const PORT = process.env.PORT || 1000;

// app.use(bodyParser.json());
// app.use(cors());

// // Use the authentication routes
// app.use('/auth', authRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
  
// });





const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const twilio = require('twilio');



const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 1000;
const client = twilio('AC9f514ccb5c47996dc4bca5f711539d25', '7302fe781c202bc25164bd1a7a5d3814');



app.use(bodyParser.json());




app.post('/create-user', async (req, res) => {
  try {
    const { username, password, phone } = req.body;

    // Check if a user with the same username already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Generate a random verification code (you can implement your own logic)
    const verificationCode = Math.floor(1000 + Math.random() * 9000);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        username,
        password,
        phone,
        verificationCode,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Could not create user' });
  }
});





// Login with OTP
app.post('/login', async (req, res) => {
  try {
    const { username, phone } = req.body;

    // Find the user by username and phone number
    const user = await prisma.user.findUnique({
      where: {
        username,
        phone,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a random OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Format the phone number to E.164 format
    const formattedPhoneNumber = `+91${user.phone}`; // Assuming it's an Indian phone number (replace '91' with the appropriate country code)

    // Send the OTP via Twilio SMS with the formatted phone number
    await client.messages.create({
      body: `Your login OTP is: ${otp}`,
      to: formattedPhoneNumber,
      from: '+17173161063',
    });

    res.status(200).json({ message: 'OTP sent for login' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});






app.post('/admin-send-otp', async (req, res) => {
  try {
    const { username, phone, customOtp } = req.body;

    // Find the user by username and phone number
    const user = await prisma.user.findUnique({
      where: {
        username,
        phone,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the custom OTP is provided and is a valid string
    if (!customOtp || typeof customOtp !== 'string' || customOtp.length === 0) {
      return res.status(400).json({ error: 'Invalid custom OTP' });
    }

    // Send the custom OTP via Twilio SMS
    const formattedPhoneNumber = `+91${user.phone}`; // Assuming it's an Indian phone number (replace '91' with the appropriate country code)
    
    await client.messages.create({
      body: `Your custom OTP: ${customOtp}`,
      to: formattedPhoneNumber,
      from: '+17173161063', // Replace with your Twilio phone number
    });

    res.status(200).json({ message: 'Custom OTP sent by admin' });
  } catch (error) {
    console.error('Error sending custom OTP:', error);
    res.status(500).json({ error: 'Failed to send custom OTP' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
