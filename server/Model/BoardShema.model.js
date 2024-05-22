import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const subtaskSchema = new Schema({
    subtaskDescription: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });


const taskSchema = new Schema({
    taskDescription: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    subtasks: [subtaskSchema]
},
    {
        timestamps: true
    });


const todoBoardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    columns: {
        todo: { type: [taskSchema], default: [] },
        inProgress: { type: [taskSchema], default: [] },
        done: { type: [taskSchema], default: [] }
    }
},
    {
        timestamps: true
    });

const TodoBoard = mongoose.model('TodoBoard', todoBoardSchema);

export default TodoBoard;
