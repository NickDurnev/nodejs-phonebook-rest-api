const { avatarService } = require("../service");
const { setUserAvatar, setAvatarURL } = avatarService;

const setAvatar = async (req, res, next) => {
  const { email } = req.user;
  const { filename } = req.file;
  const userAvatar = await setUserAvatar(email, filename);
  const { avatarURL } = await setAvatarURL(email, userAvatar);
  if (avatarURL) {
    res.status(200).json({
      avatarURL: avatarURL,
    });
  } else {
    next();
  }
};

module.exports = setAvatar;
