const jwt = require("jsonwebtoken");

exports.protect = (...roles) => {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header)
        return res.status(401).json({ message: "Token missing" });

      const token = header.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};
