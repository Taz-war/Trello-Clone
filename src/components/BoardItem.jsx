import { useContext } from "react";
import { icons } from "../assets";

import { BoardContext } from "../contexts/Board";
import { ListContext } from "../contexts/List"
import { TaskContext } from "../contexts/Task";

const BoardItem = ({ board }) => {
  const { dispatchBoardAction } = useContext(BoardContext)
  const { lists, dispatchListAction } = useContext(ListContext)
  const { tasks, dispatchTaskAction } = useContext(TaskContext)

  const removeBoardHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const listsToBeRemoved = lists.filter(item => item.boardId === board.id)
    const tasksToBeRemoved = tasks.filter(item => item.boardId === board.id)

    dispatchBoardAction({ type: 'REMOVE_BOARD', payload: board.id })

    listsToBeRemoved.forEach(item => {
      dispatchListAction({ type: 'REMOVE_LIST', payload: item.id })
    });
    tasksToBeRemoved.forEach(item => {
      dispatchTaskAction({ type: 'REMOVE_TASK', payload: item.id })
    });
  }
  return (
    <div className="board-box d-flex flex-direction-column">
      <div className="d-flex justify-content-between">
        <h5 className="title-gap">{board.title}</h5>
        <img onClick={removeBoardHandler} className="add-item-icon" alt="Delete Board" src={icons.crossIcon} />
      </div>
      <p className="title-gap align-self-flex-end">This board has {board.lists.length} List</p>
    </div>
  );
};

export default BoardItem;
