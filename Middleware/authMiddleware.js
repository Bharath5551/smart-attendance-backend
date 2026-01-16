 const jwt = require("jsonwebtoken");

module.exports = (requiredRole = null) => {
  return (req, res, next) => {

    // Safety check
    if (!req || !req.headers) {
      return res.status(401).json({ message: "Invalid request" });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // decoded = { id, role, iat, exp }
      req.user = decoded;

      // Role-based protection (teacher / student)
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: "Access denied" });
      }

      next(); // ✅ request allowed

    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
