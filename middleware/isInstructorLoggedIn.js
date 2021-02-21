function isInstructorLoggedIn(req, res, next) {
    if (!req.instructor) {
        req.flash('error', 'You must be signed in to access page');
        res.redirect('/instructor/login');
    } else {
        console.log('thanks for being logged in instructor')
        next();
    }
}

module.exports = isInstructorLoggedIn;