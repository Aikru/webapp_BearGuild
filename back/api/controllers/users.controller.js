const User = require("../../db/Users");
const { generateEncryptedPassword } = require("../utils/password.utils");

const usersWantedAttributes = [
  "id",
  "firstname",
  "lastname",
  "DOB",
  "gender",
  "email",
  "city",
  "have_paid",
  "is_jdr_player",
  "is_jds_player",
  "is_volunteer",
  "is_member_of_honor",
];

const getAllUsers = () =>
  User.findAll({
    attributes: usersWantedAttributes,
  });

const createUser = async ({
  firstname,
  lastname,
  gender,
  mail,
  city,
  have_paid,
  dob,
  is_jdr_player,
  is_jds_player,
  is_volunteer,
  is_member_of_honor,
  is_admin,
  is_super_admin,
}) => {
  try {
    const trimmedDob = dob.replace(/-/g, "");
    const password = await generateEncryptedPassword(
      `${lastname}${firstname}${trimmedDob}`
    );
    const user = await User.create({
      firstname,
      lastname,
      gender,
      email: mail,
      city,
      DOB: dob,
      have_paid,
      is_jdr_player,
      is_jds_player,
      is_volunteer,
      is_member_of_honor,
      is_admin,
      is_super_admin,
      password,
    });

    return {
      id: user.id,
      firstname: user.firstname,
      firstname: user.firstname,
      lastname: user.lastname,
      DOB: user.DOB,
      gender: user.gender,
      email: user.email,
      city: user.city,
    };
  } catch (error) {
    throw error;
  }
};

const getUser = (id) => {
  try {
    return User.findOne({
      where: { id },
      attributes: usersWantedAttributes,
    });
  } catch (error) {
    throw error;
  }
};

const updateUser = async (
  id,
  {
    firstname,
    lastname,
    gender,
    mail,
    have_paid,
    is_jdr_player,
    is_jds_player,
    is_volunteer,
    is_member_of_honor,
    is_admin,
    is_super_admin,
  }
) => {
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) return null;

    user.firstname = firstname;
    user.lastname = lastname;
    user.gender = gender;
    user.email = mail;
    user.have_paid = have_paid;
    user.is_jdr_player = is_jdr_player;
    user.is_jds_player = is_jds_player;
    user.is_volunteer = is_volunteer;
    user.is_member_of_honor = is_member_of_honor;
    user.is_admin = is_admin;
    user.is_super_admin = is_super_admin;
    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
};

const deleteUser = (id) => {
  try {
    return User.destroy({ where: { id } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  usersWantedAttributes,
};
