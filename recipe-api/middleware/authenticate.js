const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
      return res.status.json("You do not have access.")
    }
    next();
  
};

const isManager = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    req.user.username === "Nompilon"
  ) {
    return next();
  }

  return res.status(403).json({
    message: "Managers only"
  });
};

module.exports = {
    isAuthenticated,
    isManager
}