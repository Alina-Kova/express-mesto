const router = require('express').Router();
const {
  getUser, getUserById, getMe, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/me', getMe);
router.get('/:userId', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
