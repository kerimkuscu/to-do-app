"use client";

import {ITask} from "@/types/tasks";
import {FormEventHandler, useState} from "react";
import {FiEdit, FiTrash2} from "react-icons/fi";
import Modal from "./Modal";
import {useRouter} from "next/navigation";
import {deleteTodo, editTodo} from "@/api";

interface TaskProps {
    task: ITask;
}

const Task: React.FC<TaskProps> = ({task}) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const [descriptionToEdit, setDescriptionToEdit] = useState<string>(task.text);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: taskToEdit,
            description: descriptionToEdit
        });
        setOpenModalEdit(false);
        router.refresh();
    };

    const handleDeleteTask = async (id: string) => {
        await deleteTodo(id);
        setOpenModalDeleted(false);
        router.refresh();
    };

    return (
        <tr key={task.id}>
            <td className="w-96">{task.text}</td>
            <td className='w-96'>{task.description}</td>
            <td className='flex gap-5'>
                <FiEdit
                    onClick={() => setOpenModalEdit(true)}
                    cursor='pointer'
                    className='text-blue-500'
                    size={25}
                />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className='font-bold text-lg'>Edit task</h3>
                        <div className='modal-action'>
                            <div>
                                <label className="label cursor-pointer" htmlFor="task">Task</label>
                                <input
                                    id="tas"
                                    value={taskToEdit}
                                    onChange={(e) => setTaskToEdit(e.target.value)}
                                    type='text'
                                    placeholder='Type here'
                                    className='input input-bordered w-full'
                                />
                            </div>

                            <div>
                                <label className="label cursor-pointer" htmlFor="description">Description</label>

                                <textarea
                                    id="description"
                                    value={descriptionToEdit}
                                    onChange={(e) => setDescriptionToEdit(e.target.value)}
                                    placeholder='Type here'
                                    className='textarea textarea-bordered textarea-md w-full'
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button className="btn mr-2" onClick={() => setOpenModalEdit(false)}>
                                    Cancel
                                </button>

                                <button type='submit' className='btn btn-primary'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>
                <FiTrash2
                    onClick={() => setOpenModalDeleted(true)}
                    cursor='pointer'
                    className='text-red-500'
                    size={25}
                />
                <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                    <h3 className='text-lg'>
                        Are you sure, you want to delete this task?
                    </h3>
                    <div className='flex justify-end mt-4'>
                        <button className="btn mr-2" onClick={() => setOpenModalDeleted(false)}>
                            Cancel
                        </button>

                        <button onClick={() => handleDeleteTask(task.id)} className='btn btn-error'>
                            Delete
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    );
};

export default Task;