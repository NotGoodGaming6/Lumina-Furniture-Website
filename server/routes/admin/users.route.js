const express = require('express');
const { getAdminUsers, updateUserRole, deleteUser } = require('#controllers/admin/admin.users.controller.js');
const { protect, authorize } = require('#middleware/user/auth.middleware.js');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', getAdminUsers);
router.put('/:id/role', updateUserRole);
router.delete('/:id', deleteUser);

module.exports = router;
