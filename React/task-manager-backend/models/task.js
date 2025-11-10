import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        text: { type: String, default: '' },
        category: { type: String, default: 'werk' },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model('Task', taskSchema);