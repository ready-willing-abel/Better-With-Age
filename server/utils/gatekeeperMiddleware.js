const gatekeeperMiddleware = {};

gatekeeperMiddleware.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(401);
  }
};

gatekeeperMiddleware.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    res.sendStatus(403);
  }
};

gatekeeperMiddleware.isUpdatingUser = (req, res, next) => {
  // add req.user.id == ?? (so users can update their own details)
  if (req.user.isAdmin) {
    next()
  } else {
    res.sendStatus(403);
  }
};


module.exports = gatekeeperMiddleware;