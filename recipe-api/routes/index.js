const router = require("express").Router();
const passport = require("passport");

//router.use("/", require("./swagger"));
router.use("/recipes", require("./recipesRoute"));
router.use("/users", require("./usersRoute"));

router.get('/test', (req, res) => {
  res.send('TEST ROUTE WORKS');
});

/* #swagger.ignore = true */
router.get(
    '/login',
    passport.authenticate('github'),
    (req, res) => { });

/* #swagger.ignore = true */
//router.get(
  //'/github/callback',
  //passport.authenticate('github', {
    //failureRedirect: '/login'
  //}),
  //(req, res) => {
   // res.redirect('/api-docs');
  //}
//);

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