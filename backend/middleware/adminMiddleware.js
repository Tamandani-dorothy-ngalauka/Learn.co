function adminMiddleware(req, res, next) {

  // check if user exists
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  // check role
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only"
    });
  }

  next();
}

module.exports = adminMiddleware;
