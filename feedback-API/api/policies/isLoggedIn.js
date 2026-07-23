module.exports = async function (req, res, proceed) {
  if (req.session && req.session.authenticated) {
    return proceed(); // Allowed!
  }

  return res.status(401).json({ error: "Unauthorized. Please log in first." });
};