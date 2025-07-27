const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/create', upload.single('profileImage'), userController.createUser);
router.post('/login', userController.loginUser);

// ✅ Logout Route
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // remove JWT from browser
  res.redirect('/');        // redirect to login/register page
});


module.exports = router;
