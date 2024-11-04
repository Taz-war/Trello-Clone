import React from 'react'
import { TaskContext } from "../contexts/Task";
import { ListContext } from "../contexts/List";
import { BoardContext } from "../contexts/Board";
import { useState, useContext } from 'react';
import { icons } from '../assets';
import AddItemForm from './AddItemForm';

const TaskCard = ({ task, index }) => {
    const [taskTitle, setTaskTitle] = useState(task.title)
    const [editMode, setEditMode] = useState(false)
    const { dispatchTaskAction } = useContext(TaskContext)
    const { dispatchListAction } = useContext(ListContext)
    const { dispatchBoardAction } = useContext(BoardContext)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatchTaskAction({ type: 'UPDATE_TASK', payload: { id: task.id, title: taskTitle } })
        setEditMode(false)
    }

    const removeHandler = () => {
        dispatchTaskAction({ type: "REMOVE_TASK", payload: { id: task.id } })
        dispatchListAction({ type: "REMOVE_TASK_ID_TO_A_LIST", payload: { id: task.listId, taskId: task.id } })
        dispatchBoardAction({ type: "REMOVE_TASK_ID_FROM_A_BOARD", payload: { id: task.boardId, taskId: task.id } })
    }
    return (
        <div>
            {editMode ? (
                <AddItemForm onChangeHandler={(e) => setTaskTitle(e.target.value)} title={taskTitle} setEditMode={setEditMode} submitHandler={submitHandler} />
            ) : (
                <div onClick={() => setEditMode(true)} className='task-card'>
                    <p>{taskTitle}</p>
                    <img src={icons.crossIcon} onClick={removeHandler} className='add-item-icon' alt="" />
                </div>
            )}
        </div>
    )
}

export default TaskCard