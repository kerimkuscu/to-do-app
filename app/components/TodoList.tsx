import { ITask } from "@/types/tasks";
import React from "react";
import Task from "./Task";

interface TodoListProps {
    tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
    return (
        <div className='overflow-x-auto'>
            {tasks.length === 0 ? (
                <div className="badge badge-warning gap-2 w-full">
                    Please add new task
                </div>
            ) : (
                <table className='table w-full'>
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Tasks</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <Task key={task.id} task={task}/>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TodoList;
