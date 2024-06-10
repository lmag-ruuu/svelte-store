import 'dotenv/config';
import { IoRedisSessionStore } from '@ethercorps/sveltekit-redis-session';
import Redis from 'ioredis';


export interface IUserSession {
  email: string;
  user_type: string;
  id: number;
}

export interface IBaseLocals {
  isUserLoggedIn: boolean;
  user: IUserSession | null;
}

const SECRET = process.env.SECRET as string;
const REDIS_URL = process.env.REDIS_URL as string | undefined;

// Now we will create new Instance for RedisSessionStore
const options = {
  redisClient: new Redis(REDIS_URL || 'redis://localhost:6379'),
  secret: SECRET || 'secret',
}
// These are the required options to use RedisSessionStore.
export const sessionManager = new IoRedisSessionStore(options)