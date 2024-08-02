"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>("");
    const [newDescriptionValue, setNewDescriptionValue] = useState<string>("");

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addTodo({
            id: uuidv4(),
            text: newTaskValue,
            description: newDescriptionValue
        });
        setNewTaskValue("");
        setModalOpen(false);
        router.refresh();
    };

    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className='btn btn-primary w-full'
            >
                Add new task <AiOutlinePlus className='ml-2' size={18} />
            </button>

            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmitNewTodo}>
                    <h3 className='font-bold text-lg'>Add new task</h3>
                    <div className='modal-action'>
                        <div>
                            <label htmlFor="task" className="label">
                                Task
                            </label>

                            <input
                                id="task"
                                value={newTaskValue}
                                onChange={(e) => setNewTaskValue(e.target.value)}
                                type='text'
                                placeholder='Type here'
                                className='input input-bordered w-full'
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="label">
                                Description
                            </label>

                            <textarea
                                id="description"
                                value={newDescriptionValue}
                                onChange={(e) => setNewDescriptionValue(e.target.value)}
                                placeholder='Type here'
                                className='textarea textarea-bordered textarea-md w-full'
                            />
                        </div>
                        <div className="flex justify-end mt-4">

                            <button className="btn mr-2" onClick={() => setModalOpen(false)}>
                                Cancel
                            </button>

                            <button type='submit' className='btn btn-primary'>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddTask;