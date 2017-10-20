module.exports = db => {
  return {
    createUser: (req, res) => {
      res.send('User created');
    },
    updateUser: (req, res) => {
      res.send('User updated');
    },
    deleteUser: (req, res) => {
      res.send('User deleted');
    },
    getUsers: (req, res) => {
      res.send('All users');
    },
    getUser: (req, res) => {
      res.send('A user');
    }
  };
};
