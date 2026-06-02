const router = require("express").Router();
const passport = require("passport");

router.use("/recipes", require("./recipesRoute"));
router.use("/users", require("./usersRoute"));

/* #swagger.ignore = true */
router.get(
    '/login',
    passport.authenticate('github'),
    (req, res) => { });

/* #swagger.ignore = true */
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.status(200).json({
      message: 'Logged out successfully'
    });
  });
});

module.exports = router;