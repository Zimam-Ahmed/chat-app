async function logout(req, res){
    try {
        const cookiesOption = {
            http : true,
            secure : true,
        }
        return res.cookies('token', token, cookiesOption).status(200).json({
            message: 'Session out',
            success: true,

        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true 
        })
    }
}

module.exports = logout