import { OAuth2Client } from 'google-auth-library';
// import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//intercept ANY request user to be authorized
const auth = async (req, res, next) => {
  try {
    //get `Bearer ${currentUser.token}`
    const token = req.headers.authorization.split(' ')[1];
    //check if its google token since tokens are > 1000 chars
    const googleToken = token.length > 1000;
    if (googleToken) {
        //verify token
        const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      //extract payload that comes from google and check if its valid to add to db later on
      const payload = ticket.getPayload();
      req.user = {
        id: payload.sub,
        name: payload.name,
        photoURL: payload.picture,
        // role: 'basic',
      };
    } else {
    //   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    //   const { id, name, photoURL, role } = decodedToken;
    //   req.user = { id, name, photoURL, role };
        //verify token
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: 'Something is wrong with your authorization!',
    });
  }
};

export default auth;