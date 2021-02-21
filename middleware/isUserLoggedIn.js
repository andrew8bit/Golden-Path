function isUserLoggedIn(req, res, next) {
    if (!req.user) {
        req.flash('error', 'You must be signed in to access page');
        res.redirect('/student/login');
    } else {
        console.log('thanks for being logged in user')
        next();
    }
}

module.exports = isUserLoggedIn;