const crypto = require('crypto');
const Token = require("../models/Token");
const User = require("../models/User");
const PendingUser = require("../models/PendingUse");
const bcrypt = require('bcryptjs');
const { sendEmail } = require("../Services/Mail");
const jwt = require("jsonwebtoken");
const userSummary = require("../models/Summary");
require("dotenv").config();

// Helper function to generate and store magic link token
async function generateMagicLink(userEmail) {
    // 1. Create a raw random token
    const rawToken = crypto.randomBytes(32).toString('hex');

    // 2. Hash it for the database
    const hash = crypto.createHash('sha256').update(rawToken).digest('hex');

    // 3. Set expiration (e.g., 15 mins from now)
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    // 4. Delete any existing tokens for this email to prevent multiple valid tokens
    await Token.deleteMany({ email: userEmail });

    // 5. Save to DB (pseudo-code)
    await Token.create({
        email: userEmail,
        tokenHash: hash,
        expiresAt: expires
    });

    // 5. Return the raw token to be sent in the email
    return `${process.env.FRONTEND_URL}/verify-signup?token=${rawToken}&email=${userEmail}`;
}

const Register = async (req, res) => {
    try {
        /// Gettigng data from req.body
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).send({ message: "Email already registered.", success: false });
        }

        // 1. Generate a salt (10 rounds is standard)
        const salt = await bcrypt.genSalt(10);

        // 2. Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Generate magic link and save pending user with token hash
        const token = await generateMagicLink(email);

        // 4. Send the magic link via email
        await sendEmail(email, "Verification Link for MailMe", `<p>Click the Verify Email  below to verify your email and complete registration:</p><a href="${token}">Verify Email</a>`);


        const tokenHash = token.split('?token=')[1].split('&email=')[0]

        // 2. The "Upsert" - Atomic Update or Create
        await PendingUser.findOneAndUpdate(
            { email }, // Find by email
            {
                name,
                password: hashedPassword,
                tokenHash
            },
            {
                upsert: true, // Create if doesn't exist
                new: true,    // Return the updated document
                runValidators: true
            }
        );

        res.status(200).send({ message: "Registration successful! Please check your email to verify your account.", success: true, link: token });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error", success: false });
    }
}


const VerifyMagicLink = async (req, res) => {
    const { token, email } = req.body;
    const hash = crypto.createHash('sha256').update(token).digest('hex');

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
    const user = await User.create({
        name: pendingUser.name,
        email: pendingUser.email,
        password: pendingUser.password
    });

    // Create a default summary for the new user
    await userSummary.create({
        UserId: user._id,
    });

    // Create Session or JWT here if you want to log them in immediately
    const jwtToken = jwt.sign({ email: user.email , id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


    // Delete pending user record
    await PendingUser.deleteOne({ email });

    res.status(200).send({ message: "Email verified! .", success: true, token: jwtToken , user: { name: user.name, email: user.email } });
}

const Login = async (req, res) => {
  const { email, password } = req.body;

try {
    // 1. Find user (Only select the password field if you've set it to 'select: false' in schema)
    const user = await User.findOne({ email });

    // Security Tip: Use the same generic message for both "not found" and "wrong password"
    // to prevent "Email Enumeration" attacks.
    if (!user) {
        return res.status(400).send({ message: "Invalid email or password.", success: false });
    }

    // 2. CORRECT Comparison
    // Pass the PLAIN password from req.body, NOT a new hashedPassword.
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).send({ message: "Invalid email or password.", success: false });
    }

    // 3. Generate JWT
    // Use only the ID. Avoid putting the email in the payload if you don't need it (smaller token).
    const jwtToken = jwt.sign(
        { email: user.email, id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );

    res.status(200).send({ 
        message: "Login successful!", 
        success: true, 
        token: jwtToken,
        user: { name: user.name, email: user.email } // Return user info for frontend
    });

} catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error", success: false });
}
 }

const GetUserInfo = async (req, res) => {
    // This is a protected route, so we assume the user is authenticated and their info is in req.user
    const userId = req.user.id;
    try {
        const user = await User.findById(userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).send({ message: "User not found", success: false });
        }
        res.status(200).send({ user, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error", success: false });
    }
}
module.exports = {
    Register,
    Login,
    VerifyMagicLink,
    GetUserInfo
}