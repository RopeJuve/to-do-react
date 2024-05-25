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
    title: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    subtasks: [subtaskSchema],
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do'
    }
},
    {
        timestamps: true
    });

const columnSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    tasks: { type: [taskSchema] }
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
const Task = mongoose.model('Task', taskSchema);

export { TodoBoard, Task }
