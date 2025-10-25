import { Schema, model, Document, Types } from 'mongoose';
export interface ITask extends Document { project: Types.ObjectId; title: string; status: 'todo'|'doing'|'done'; }
const TaskSchema = new Schema<ITask>({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  status: { type: String, enum: ['todo','doing','done'], default: 'todo' }
}, { timestamps: true });
export default model<ITask>('Task', TaskSchema);
