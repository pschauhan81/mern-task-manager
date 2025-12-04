const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ error: "Missing auth header" });
  }

  const base64 = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64, "base64").toString();
  const [username, password] = decoded.split(":");

  if (username === "admin@gmail.com" && password === "password123") {
    next();
  } else {
    return res.status(401).json({ error: "Invalid Credentials" });
  }
};

module.exports = auth;
