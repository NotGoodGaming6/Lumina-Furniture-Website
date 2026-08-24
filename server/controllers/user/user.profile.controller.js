const userService = require('#services/user/user.service.js');

exports.updateProfile = async (req, res) => {
  try {
    const profileUpdates = {};
    if (req.body.name) profileUpdates.name = req.body.name;
    if (req.body.email) profileUpdates.email = req.body.email;

    const user = await userService.updateProfile(req.user.id, profileUpdates);

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    await userService.changePassword(req.user.id, req.body.currentPassword, req.body.newPassword);

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.manageAddresses = async (req, res) => {
  try {
    const addresses = await userService.updateAddresses(req.user.id, req.body.addresses);

    res.status(200).json({ success: true, data: addresses });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const result = await userService.deleteAccount(req.user.id);
    res.status(200).json({ success: true, message: result.message });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
