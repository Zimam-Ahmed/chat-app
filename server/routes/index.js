const express = require('express');
const registerUser = require('../controller/registerUser');
const checkEmail = require('../controller/checkEmail');
const checkPassword = require('../controller/password');
const userDetail = require('../controller/userDeatils');
const logout = require('../controller/logout');
const updateUserDetail = require('../controller/updateUserDetails');
const searchUser = require('../controller/searchUser');
const router = express.Router();

router.post('/register', registerUser);
router.post('/email', checkEmail);
router.post('/password', checkPassword);
router.get('/user-details', userDetail);
router.get('/logout', logout);
router.post('/update-user', updateUserDetail);

//search user
router.post('/search-user', searchUser)

module.exports = router;