import React from 'react'
import { TaskContext } from "../contexts/Task";
import { ListContext } from "../contexts/List";
import { BoardContext } from "../contexts/Board";
import { useState, useContext } from 'react';
import { icons } from '../assets';
import AddItemForm from './AddItemForm';
import AddItem from './AddItem';

const TaskList = ({ taskList }) => {
    const [taskTitle, setTaskTitle] = useState("")
    const [editMode, setEditMode] = useState(false)

    const { title } = taskList
    const { tasks, dispatchTaskAction } = useContext(TaskContext)
    const { dispatchListAction } = useContext(ListContext)
    const { dispatchBoardAction } = useContext(BoardContext)

    const submitHandler = (e) => {
        e.preventDefault()
        const id = Date.now()+""

        dispatchTaskAction({ type: "CREATE_TASK", payload: { id: id, title: taskTitle, listId: taskList.id, boardId: taskList.boardId } })
        dispatchListAction({ type: "ADD_TASK_ID_TO_A_LIST", payload: { id: taskList.id, taskId: id } })
        dispatchBoardAction({ type: "ADD_TASK_ID_TO_A_BOARD", payload: { id: taskList.boardId, taskId: id } })
        setTaskTitle("")
        setEditMode(false)
    }

    const removeListHandler = () => {
        dispatchListAction({ type: "REMOVE_LIST", payload: taskList.id })
        dispatchBoardAction({ type: "REMOVE_LIST_ID_FROM_A_BOARD", payload: { id: taskList.boardId, listId: taskList.id } })

    }
    return (
        <div className='list-container'>
            <div className='list-title-container'>
                <h5>{title}</h5>
                <img src={icons.crossIcon} onClick={removeListHandler} className='add-item-icon' alt="" />
            </div>
            {
                taskList.tasks.map(item => {
                    return tasks.find(i => i.id === item)
                })?.map((task, index) => (
                    <TaskCard index={index} id={task.id} taskList={taskList} task={task} key={task.id} />
                ))
            }
            {
                editMode ? (
                    <AddItemForm submitHandler={submitHandler} title={taskTitle} onChangeHandler={(e) => setTaskTitle(e.target.value)} setEditMode={setEditMode} editMode={editMode} />
                ) : (
                    <AddItem setEditMode={setEditMode} />
                )
            }
        </div>
    )
}

export default TaskList
