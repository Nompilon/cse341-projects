const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: 'You do not have access.'
  });
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