var bcrypt = require("bcrypt");
const Users = require("./models/Users");

bcrypt.hash("123456", 10).then((data) => {
  console.log(data);
  var hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  data.role == 0 ? (data.role_id = 1) : (data.role_id = data.role);
  data.created_date = Date("Y-m-d");
  data.last_activity = Date("Y-m-d h:m:s");
});
