module.exports = async function login(req, res) {
  const { email, password } = req.body;

  // 1. Verify user (Query MongoDB or check hardcoded admin creds)
  if (email === "you@unicredit.com" && password === "yourSecretPassword") {
    
    // 2. Attach user to session!
    req.session.authenticated = true;
    req.session.userEmail = email;

    return res.json({ success: true, message: "Logged in successfully" });
  }

  return res.status(401).json({ error: "Invalid email or password" });
};