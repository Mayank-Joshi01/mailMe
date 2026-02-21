const crypto = require('crypto');
const Token = require("../models/Token");
const User = require("../models/User");
const PendingUser = require("../models/PendingUse");
const bcrypt = require('bcryptjs');
const {sendEmail} = require("../Services/Mail");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Helper function to generate and store magic link token
async function generateMagicLink(userEmail) {
    // 1. Create a raw random token
    const rawToken = crypto.randomBytes(32).toString('hex');

    // 2. Hash it for the database
    const hash = crypto.createHash('sha256').update(rawToken).digest('hex');

    // 3. Set expiration (e.g., 15 mins from now)
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    // 4. Save to DB (pseudo-code)
    await Token.create({
        email: userEmail,
        tokenHash: hash,
        expiresAt: expires
    });

    // 5. Return the raw token to be sent in the email
    return `http://localhost:5000/api/auth/verify-signup?token=${rawToken}&email=${userEmail}`;
}


const Register = async (req, res) => {
    try {
        /// Gettigng data from req.body
        const { name, email, password } = req.body;

        // 1. Generate a salt (10 rounds is standard)
        const salt = await bcrypt.genSalt(10);

        // 2. Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Generate magic link and save pending user with token hash
        const token = await generateMagicLink(email);

        // 4. Send the magic link via email
        await sendEmail(email, "Verification Link for MailMe", `<p>Click the link below to verify your email and complete registration:</p><a href="${token}">Verify Email</a>`);

        // 5. Save pending user to DB
        await PendingUser.create({
            name,
            email,
            password: hashedPassword,
            tokenHash: token.split('?token=')[1].split('&email=')[0]
        });

        res.status(200).send({ message: "Registration successful! Please check your email to verify your account.", success: true , link: token});

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error", success: false });
    }
}


const VerifyMagicLink = async (req, res) => {
    const { token, email } = req.query;
    const hash = crypto.createHash('sha256').update(token).digest('hex');

    console.log("Received token:", token);
    console.log("email:", email);

    // Find valid, non-expired token
    const tokenRecord = await Token.findOne({
        email,
        tokenHash: hash
        // expiresAt: { $gt: new Date() }
    });

    if (!tokenRecord) {
        return res.status(401).send({ message: "Link invalid or expired.", success: false });
    }

    // IMMEDIATELY delete or invalidate the token so it can't be used twice
    await Token.deleteOne({ _id: tokenRecord._id });

    // Save the user to the main User collection

    const pendingUser = await PendingUser.findOne({ email });

    if (!pendingUser) {
        return res.status(404).send({ message: "Pending user not found.", success: false });
    }
    await User.create({
        name: pendingUser.name,
        email: pendingUser.email,
        password: pendingUser.password
    });

    // Create Session or JWT here if you want to log them in immediately
    const jwtToken = jwt.sign({ email: pendingUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });


    // Delete pending user record
    await PendingUser.deleteOne({ email });

    res.status(200).send({ message: "Email verified! You can now log in.", success: true });
}

const Login = async (req, res) => {
    const { email , password } = req.body;


    res.send("Login endpoint");
}


module.exports = {
    Register,
    Login,
    VerifyMagicLink
}