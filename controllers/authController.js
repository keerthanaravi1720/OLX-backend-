const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const otpTokens = new Map();

// Function to generate OTP-like string
function generateOTP(length) {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters.charAt(randomIndex);
  }

  return otp;
}

async function registerUser(req, res) {
  try {
    const { username, email, phone, password } = req.body;

    // Generate an OTP-like token
    const otpToken = generateOTP(6); // Generate a 6-character OTP-like token

    // Create a new user record in the database
    const newUser = await prisma.createuser.create({
      data: {
        username,
        email,
        phone,
        password,
      },
    });

    // Store the OTP token in memory, associated with the user's phone number
    otpTokens.set(phone, otpToken);

    // Send the OTP token to the user (you can implement email or SMS sending logic here)

    res.json({ message: 'OTP sent successfully', otpToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
}

async function confirmRegistration(req, res) {
    try {
      const { otpToken } = req.body;
  
      // Initialize a variable to store the user's username
      let username = '';
  
      // Check if the submitted OTP token exists in the map
      for (const [phone, storedOtpToken] of otpTokens) {
        if (otpToken === storedOtpToken) {
          // Registration confirmed, remove the OTP token from storage
          otpTokens.delete(phone);
  
          // Fetch the user's username from the database based on the phone number
          const user = await prisma.createuser.findFirst({
            where: { phone },
          });
  
          if (user) {
            username = user.username;
          }
  
          // Optionally, you can mark the user as "verified" in your database
          // For example, if you have a Prisma model:
          // const updatedUser = await prisma.user.update({
          //   where: { phone },
          //   data: { verified: true },
          // });
  
          return res.json({
            message: `Registration confirmed successfully. Welcome, ${username}!`,
          });
        }
      }
  
      // If the OTP token is not found or is invalid
      res.status(401).json({ error: 'Invalid OTP token' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Registration confirmation failed' });
    }
  }
  
  async function loginUser(req, res) {
    try {
      const { phone } = req.body;
  
      // Check if the user with the provided phone number exists in the database
      const user = await prisma.createuser.findFirst({
        where: { phone },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Generate an OTP-like token for login
      const otpToken = generateOTP(6); // Generate a 6-character OTP-like token
  
      // Store the OTP token in memory, associated with the user's phone number
      otpTokens.set(phone, otpToken);
  
      // Send the OTP token to the user (you can implement email or SMS sending logic here)
  
      res.json({ message: 'OTP sent successfully for login', otpToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  }
 
  
  async function confirmLogin(req, res) {
    try {
      const { otpToken } = req.body;
  
      // Check if the submitted OTP token exists in the map
      for (const [phone, storedOtpToken] of otpTokens) {
        if (otpToken === storedOtpToken) {
          // OTP token matched, remove it from storage
          otpTokens.delete(phone);
  
          // Fetch the user from the database based on the phone number
          const user = await prisma.createuser.findFirst({
            where: { phone },
          });
  
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
  
          // Send a welcome back message with the username
          return res.json({
            message: `Welcome back, ${user.username}!`,
          });
        }
      }
  
      // If the OTP token is not found or is invalid
      res.status(401).json({ error: 'Invalid OTP token' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login confirmation failed' });
    }
  }

  
  async function loginByEmail(req, res) {
    try {
      const { email } = req.body;
  
      // Check if the user with the provided email exists in the database
      const user = await prisma.createuser.findFirst({
        where: { email },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Generate an OTP-like token for login
      const otpToken = generateOTP(6); // Generate a 6-character OTP-like token
  
      // Store the OTP token in memory, associated with the user's email
      otpTokens.set(email, otpToken);
  
      // Send the OTP token to the user (you can implement email or SMS sending logic here)
  
      res.json({ message: 'OTP sent successfully for login', otpToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  }
  
  async function confirmLoginByEmail(req, res) {
    try {
      const { otpToken } = req.body;
  
      // Check if the submitted OTP token exists in the map
      for (const [storedEmail, storedOtpToken] of otpTokens) {
        if (otpToken === storedOtpToken) {
          // OTP token matched, remove it from storage
          otpTokens.delete(storedEmail);
  
          // Fetch the user from the database based on the email associated with the OTP (optional)
          const user = await prisma.createuser.findFirst({
            where: { email: storedEmail },
          });
  
          // Send a welcome back message (with the username if the user exists)
          if (user) {
            return res.json({
              message: `Welcome back, ${user.username}!`,
            });
          } else {
            return res.json({
              message: 'Login successful',
            });
          }
        }
      }
  
      // If the OTP token is not found or is invalid
      res.status(401).json({ error: 'Invalid OTP token' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login confirmation failed' });
    }
  }
  
  module.exports = {
    registerUser,
    confirmRegistration,
    loginUser,
    confirmLogin,
    loginByEmail, // Add the new controller for email-based login
    confirmLoginByEmail, // Add the new controller for email-based login confirmation
  };
  