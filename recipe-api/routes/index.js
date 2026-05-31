const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));
router.use("/recipes", require("./recipes"));
router.use("/users", require("./users"));

router.get(
    '/login',
    passport.authenticate('github'),
    (req, res) => { });

//router.get(
  //'/github/callback',
  //passport.authenticate('github', {
   // failureRedirect: '/login'
 // }),
  //(req, res) => {
  //  res.redirect('/api-docs');
  //}
//);

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