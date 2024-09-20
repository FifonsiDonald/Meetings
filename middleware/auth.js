// const refreshGoogleToken = async (req, res, next) => {
//     const refreshToken = req.cookies['refresh_token'];

//     if (refreshToken) {
//         try {
//             const { credentials } = await oauth2Client.refreshToken(refreshToken);
//             oauth2Client.setCredentials(credentials);
//             next(); // Proceed with the request after token refresh
//         } catch (error) {
//             console.error('Error refreshing token:', error);
//             return res.status(401).json({ error: 'Session expired, please log in again' });
//         }
//     } else {
//         return res.status(401).json({ error: 'No refresh token available. Please log in again.' });
//     }
// };

const jwt = require('jsonwebtoken');

// Middleware to verify token
module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.replace('Bearer ', ''); // Safely access 'authorization' header

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach decoded token payload (user info) to the request
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};
