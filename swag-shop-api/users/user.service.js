require("rootpath")();
const config = require("config.json");
const jwt = require("jsonwebtoken");
var User = require("../model/user");
// users hardcoded for simplicity store in a db for production applications
// const users = [
//   {
//     id: 1,
//     username: "test",
//     password: "test",
//     firstName: "Test",
//     lastName: "User"
//   }
// ];


module.exports = {
  authenticate,
  getAll
};

async function authenticate({ username, password }) {
  let userTmp;
  await  User.findOne({username: username, password: password}, function(err, user) {
    if (user) {
      userTmp = user._doc;
      // const token = jwt.sign({ sub: userTmp._id }, config.secret);
      //   const { password, ...userWithoutPassword } = userTmp;
      //   console.log(token);
      //   return {
      //     ...userWithoutPassword,
      //     token
      //   };
      }

  })
  if (userTmp) {
  const token = jwt.sign({ sub: userTmp._id }, config.secret);
  const { password, ...userWithoutPassword } = userTmp;
  return {
    ...userWithoutPassword,
    token
  };
}
  // const user = users.find(
  //   u => u.username === username && u.password === password
  // );
  // if (user) {
  //   const token = jwt.sign({ sub: user.id }, config.secret);
  //   const { password, ...userWithoutPassword } = user;
  //   console.log(userWithoutPassword);
  //   console.log(user);
  //   return {
  //     ...userWithoutPassword,
  //     token
  //   };
  // }
}

async function getAll() {
  return users.map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}
