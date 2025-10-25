import { Schema, model, Document, Types } from 'mongoose';
export interface IProject extends Document { name: string; owner: Types.ObjectId; members: Types.ObjectId[]; }
const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
export default model<IProject>('Project', ProjectSchema);
