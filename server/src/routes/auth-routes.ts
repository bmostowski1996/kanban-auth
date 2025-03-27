import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;

  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);

  // Try and find a user associated with the supplied credentials
  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    // What if we can't find a user?
    console.log(`Couldn't find a user!`);
    return res.status(401).json({message: 'Authentication failed!'});
  }

  console.log(`Found user!`);
  
  // Check whether the supplied password is valid
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    // What if the passwords don't match?
    return res.status(401).json({ message: 'Authentication failed!'});
  }

  // At this point, we have achieved a successful login
  // Supply the user with a JWT token
  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1m'});

  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
