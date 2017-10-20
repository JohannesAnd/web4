module.exports = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.send(401, {
      err: 'Not authenticated'
    });
  };
};
