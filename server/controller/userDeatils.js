const getUserDetailsFromToken = require("../helpers/getUserDeatilsFromToken");

async function userDetail(req, res){
    try {
        const token = req.cookies.token || '';
        const user = await getUserDetailsFromToken(token)
        
        return res.status(200).json({
            message : 'User Details',
            data: user
        }) 

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        });
    }
}

module.exports = userDetail