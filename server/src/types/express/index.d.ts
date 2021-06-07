import { IUser } from './../../graphql/interfaces/IUser';
declare global {
  declare namespace express {
    interface Request {
      user: IUser;
    }
  }
}
