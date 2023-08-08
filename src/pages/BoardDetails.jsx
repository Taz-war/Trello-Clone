import React from "react";
import { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ListContext } from "../contexts/List";
import { TaskContext } from "../contexts/Task";

import AddItem from "../components/AddItem";
import AddItemForm from "../components/AddItemForm";
import { BoardContext } from "../contexts/Board";

const BoardDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const { boardId } = useParams();

  const { lists,dispatchListAction } = useContext(ListContext);
  const {dispatchBoardAction} = useContext(BoardContext)

  const submitHandler = (e) => {
    e.preventDefault()
    const id = Date.now();
    dispatchListAction({type:"CREATE_List",payload:{id:id,title:listTitle,boardId:boardId} })
    dispatchBoardAction({type:'ADD_LIST_ID_TO_A_BOARD',payload:{id:boardId,listId:id}})
    setEditMode(false)
    setListTitle('')
  };
  return (
    <div className="d-flex m-top-sm flex-direction-row">
      <Link to={"/"}>Back to Boards</Link>
      {lists
        .filter((item) => item.boardId === boardId)
        .map((taskList) => (
          <li key={taskList.id}>{taskList.title}</li>
        ))}
      {!editMode ? (
        <AddItem listAddItem={true} setEditMode={setEditMode} />
      ) : (
        <AddItemForm
          setEditMode={setEditMode}
          listForm={true}
          submitHandler={submitHandler}
          title={listTitle}
          onChangeHandler={(e)=>setListTitle(e.target.value)}
        />
      )}
    </div>
  );
};

export default BoardDetails;
