const router = require("express").Router();
const passport = require("passport");

//router.use("/", require("./swagger"));
router.use("/recipes", require("./recipesRoute"));
router.use("/users", require("./usersRoute"));

/* #swagger.tags = ['Auth']
   #swagger.summary = 'GitHub Login'
*/
router.get(
    '/login',
    passport.authenticate('github'),
    (req, res) => { });

/* #swagger.tags = ['Auth']
   #swagger.summary = 'GitHub Callback'
*/
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

/* #swagger.tags = ['Auth']
   #swagger.summary = 'Logout user'
*/
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