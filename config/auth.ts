import jwt, { JwtPayload } from 'jsonwebtoken';
import  { Request, Response, NextFunction } from "express";

// private key for jwt authentication
const RSA_PRIVATE_KEY = require("./utils");

// Implement JWT Authentication Token : https://jwt.io/
// Other options for building the authentication in a separate project (the right way to do it):
// - ORY : https://www.ory.sh/docs/kratos/quickstart , https://www.ory.sh/identity-authentication/
// - oauth : https://auth0.com/intro-to-iam/what-is-oauth-2
// - authelia : https://www.authelia.com/overview/prologue/introduction/
// - Google/OpenID oauth based login and authentication for the traefik reverse proxy : https://github.com/thomseddon/traefik-forward-auth
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, RSA_PRIVATE_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
};

module.exports = authenticateToken;