import React from "react";
import { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ListContext } from "../contexts/List";
import { TaskContext } from "../contexts/Task";
import { BoardContext } from "../contexts/Board";
import AddItem from "../components/AddItem";
import AddItemForm from "../components/AddItemForm";
import TaskList from "../components/TaskList";

const BoardDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const { boardId } = useParams();

  const { lists, dispatchListAction } = useContext(ListContext);
  const { dispatchBoardAction } = useContext(BoardContext);
  const { dispatchTaskAction } = useContext(TaskContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const id = Date.now();
    dispatchListAction({
      type: "CREATE_LIST",
      payload: { id: id, title: listTitle, boardId: boardId },
    });
    dispatchBoardAction({
      type: "ADD_LIST_ID_TO_A_BOARD",
      payload: { id: boardId, listId: id },
    });
    setEditMode(false);
    setListTitle("");
  };
  return (
    <div className="d-flex m-top-sm flex-direction-row">
      <Link to={"/"}>Back to Boards</Link>
      {lists
        .filter((item) => item.boardId === boardId)
        .map((taskList, index) => (
          <TaskList taskList={taskList} key={taskList.id} index={index} />
        ))}
      {!editMode ? (
        <AddItem listAddItem setEditMode={setEditMode} />
      ) : (
        <AddItemForm
          setEditMode={setEditMode}
          listForm
          submitHandler={submitHandler}
          title={listTitle}
          onChangeHandler={(e) => setListTitle(e.target.value)}
        />
      )}
    </div>
  );
};

export default BoardDetails;
