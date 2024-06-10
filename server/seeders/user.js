import { User } from "../models/user.js";
const createUser = async (numUsers) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.name.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.paragraph(),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);
    }
    await Promise.all(usersPromise);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
