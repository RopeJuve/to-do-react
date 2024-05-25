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

const columnSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    tasks: { type: [taskSchema], default: [] }
},
    {
        timestamps: true
    });

const todoBoardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    columns: [columnSchema]
},
    {
        timestamps: true
    });

const TodoBoard = mongoose.model('TodoBoard', todoBoardSchema);

export default TodoBoard;
