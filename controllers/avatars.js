const createError = require("http-errors");
const { avatarService } = require("../service");
const { setContactAvatar, setAvatarURL } = avatarService;

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const setAvatar = async (req, res, next) => {
  if (!whitelist.includes(req.file.mimetype)) {
    next(createError(415, "Unsupported media type"));
    return;
  }
  const { contactID } = req.params;
  const { filename } = req.file;
  const prevURL = req.body.prevURL;
  const userAvatar = await setContactAvatar(filename, prevURL);
  const { avatarURL } = await setAvatarURL(contactID, userAvatar);
  if (avatarURL) {
    res.status(200).json({
      avatarURL: avatarURL,
    });
  } else {
    next();
  }
};

module.exports = { setAvatar };
