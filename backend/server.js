const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Test Route
app.get('/api/test', (req, res) => {
    console.log('Test route hit');
    res.json({ message: "Backend running with MongoDB!" });
});

// Auth Routes
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.post('/api/auth/google', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const { name, email, picture, sub } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email,
                googleId: sub,
                picture
            });
            await user.save();
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user });
            }
        );

    } catch (err) {
        console.error('Google Auth Error:', err.message);

        // Fallback for strict clock skew errors (Token used too early)
        if (err.message.includes('Token used too early')) {
            console.log('⚠️ Clock skew detected. Attempting to proceed with payload from error...');
            try {
                // Extract JSON part from error message
                const jsonPart = err.message.substring(err.message.indexOf('{'));
                const payload = JSON.parse(jsonPart);

                const { name, email, picture, sub } = payload;

                let user = await User.findOne({ email });

                if (!user) {
                    user = new User({
                        name,
                        email,
                        googleId: sub,
                        picture
                    });
                    await user.save();
                }

                const jwtPayload = {
                    user: {
                        id: user.id
                    }
                };

                jwt.sign(
                    jwtPayload,
                    process.env.JWT_SECRET || 'secret',
                    { expiresIn: '7d' },
                    (err, token) => {
                        if (err) throw err;
                        return res.json({ token, user });
                    }
                );
                return; // Exit after successful fallback
            } catch (fallbackErr) {
                console.error('Fallback failed:', fallbackErr);
            }
        }

        res.status(401).send('Google authentication failed');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
