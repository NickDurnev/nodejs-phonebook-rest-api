const { avatarService } = require("../service");
const { setContactAvatar, setAvatarURL } = avatarService;

const setAvatar = async (req, res, next) => {
  const { contactID } = req.params;
  const { filename } = req.file;
  const prevURL = req.body.prevURL;
  const userAvatar = await setContactAvatar(contactID, filename, prevURL);
  const { avatarURL } = await setAvatarURL(contactID, userAvatar);
  if (avatarURL) {
    res.status(200).json({
      avatarURL: avatarURL,
    });
  } else {
    next();
  }
};

module.exports = setAvatar;
