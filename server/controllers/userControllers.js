const { User } = require('../../db/index');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  let pw = req.body.password;
  let name = req.body.name;

  User.findOne({
    where: { username: name },
  }).then((user) => {
    if (user) {
      let isMatch = bcrypt.compareSync(pw, user.password);
      if (isMatch) {
        req.session.user = user;
        res.status(200).send('Successful login!');
      } else {
        console.log('pw is not a match: ', isMatch);
      }
    } else {
      let hash = bcrypt.hashSync(pw, 10);
      User.create({ username: name, password: hash }).then(() => {
        req.session.user = user;
        res.status(201).send('Created');
      }).catch(() => {
        res.status(404).send('Not created');
      })
    }
  }).catch((err) => {
    console.error(err);
    res.status(404).send('Invalid password/name');
  })
};

exports.logout = (req, res) => {
  console.log('inside of logout in userCtrl', req.session)
  req.session.reset();
  res.status(200).send('Logged out!');
};

exports.checkUser = (req, res) => {
  if (req.session && req.user) {
    res.send('Logged in');
  }
}
