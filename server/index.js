const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// --- API ROUTES ---

// 1. SIGN UP A NEW USER
app.post('/api/signup', async (req, res) => {
  const { email, name, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    
    // Don't send the hashed password back to the client
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);

  } catch (error) {
    // Prisma error code for a unique constraint violation (e.g., email already exists)
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }
    // Generic server error
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});