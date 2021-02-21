function isInstructorLoggedIn(req, res, next) {
    if (!req.user) {
        req.flash('error', 'You must be signed in to access page');
        res.redirect('/instructor/login');
    } else if(req.user.role === "instructor") {
        console.log('thanks for being logged in instructor')
        next();
    }
}

module.exports = isInstructorLoggedIn;