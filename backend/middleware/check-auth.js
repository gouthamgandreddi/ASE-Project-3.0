const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,'one_piece_wealth_fame_power');
        next();
    } catch (error) {
        res.status(401).json({
            message:'Auth failed!'
        });
    }
};
