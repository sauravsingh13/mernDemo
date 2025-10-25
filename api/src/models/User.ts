import { Schema, model, Document } from 'mongoose';
export interface IUser extends Document { email: string; name: string; password: string; }
const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });
export default model<IUser>('User', UserSchema);
