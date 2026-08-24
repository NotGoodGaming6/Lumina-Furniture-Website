const User = require('#models/user/user.model.js');

exports.getAdminUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    console.error('getAdminUsers error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, error: 'Invalid role specified' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (user._id.toString() === req.user._id.toString() && role !== 'admin') {
      return res.status(400).json({ success: false, error: 'You cannot revoke your own admin access' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      success: true,
      data: user,
      message: `User role updated to ${role}`
    });
  } catch (err) {
    console.error('updateUserRole error:', err);
    res.status(500).json({ success: false, error: 'Failed to update user role' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, error: 'You cannot delete your own admin account' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'User account removed successfully'
    });
  } catch (err) {
    console.error('deleteUser error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
};
