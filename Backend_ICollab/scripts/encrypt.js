const { hashPassword } = require('../src/utils/PasswordEncoder');

Password = 'Naman3147';

const encrypt = async () => {
  const data = await hashPassword(Password);
  console.log(data);
};
encrypt();
