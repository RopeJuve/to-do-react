import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the schema for subtasks
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

// Define the schema for tasks
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

// Define the schema for the TodoBoards
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
