const crypto = require('crypto');

async function generateMagicLink(userEmail) {
  // 1. Create a raw random token
  const rawToken = crypto.randomBytes(32).toString('hex');
  
  // 2. Hash it for the database
  const hash = crypto.createHash('sha256').update(rawToken).digest('hex');
  
  // 3. Set expiration (e.g., 15 mins from now)
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  // 4. Save to DB (pseudo-code)
//   await db.tokens.create({ 
//     email: userEmail, 
//     tokenHash: hash, 
//     expiresAt: expires 
//   });

  // 5. Return the raw token to be sent in the email
  return `https://yourapp.com/auth/verify?token=${rawToken}&email=${userEmail}`;
}


const Register = async (req, res) => {
    const { name, email, password } = req.body;

    res.send("Register endpoint");
}

const Login = async (req, res) => {
    const { email, password } = req.body;

    res.send("Login endpoint");
}

const VerifyMagicLink = async (req, res) => {
    const { token, email } = req.query;
  const hash = crypto.createHash('sha256').update(token).digest('hex');

  // Find valid, non-expired token
  const tokenRecord = await db.tokens.findOne({ 
    email, 
    tokenHash: hash,
    expiresAt: { $gt: new Date() }
  });

  if (!tokenRecord) {
    return res.status(401).send("Link invalid or expired.");
  }

  // IMMEDIATELY delete or invalidate the token so it can't be used twice
  await db.tokens.deleteOne({ _id: tokenRecord._id });

  // Issue your JWT or Session Cookie here
  const sessionToken = issueJWT(email); 
  res.cookie('session', sessionToken).redirect('/dashboard');
}

module.exports = {
    Register,
    Login,
    VerifyMagicLink
}