const express = require("express");
const UserModel = require("./models/userModel.js");


const app = express();

//middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

const userModel = new UserModel();

// Register user
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userId = await userModel.register(name, email, password);
    res.status(201).json({ id: userId });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// Update password
app.put('/update-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const isUpdated = await userModel.updatePassword(email, newPassword);
    if (isUpdated) {
      res.status(200).json({ message: 'Password updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating password' });
  }
});

// Delete user
app.delete('/delete', async (req, res) => {
  const { email } = req.body;
  try {
    const isDeleted = await userModel.delete(email);
    if (isDeleted) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});




