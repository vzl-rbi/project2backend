import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { envJwt } from "../config/config.js"
import User from "../database/models/user.model.js"

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  }
}
export const authMiddleware = async (req: AuthRequest, res:Response, next:NextFunction):Promise<void> => {
  //get token from user
  const token = req.headers.authorization   //authorization ko je name rakhda ni hunxa
  if(!token || token === undefined || token === null ) {
    res.status(403).json({message: "Token not found, Unauthorized User "})
    return
  }
  //verify token if it is legit or tampered
  jwt.verify(token as string, envJwt.secret, async (err, decoded:any) => {
    if(err) {
      res.status(403).json({message: "Invalid Token"})
    } else{
      try {
        //check if that decoded id, user exist or not
      const userData = await User.findByPk(decoded.id)
      if(!userData) {
        res.status(401).json({message: "No user with that token"})
        return
      }
      req.user = userData
      next()
      } catch (error) {
        res.status(401).json({message: "Invalid or Expire token"})        
      } 
    }
  })

}
export enum Role {
  Admin = "admin",
  Customer = "customer",
}

export const restrictTo = (...roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }
    const userRole = req.user.role as Role
    console.log("My Role: ", userRole)

    if (!roles.includes(userRole)) {
      res.status(403).json({message: "Access denied"});
      return;
    }
    next();
  };
};
