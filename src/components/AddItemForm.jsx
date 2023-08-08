import React from "react";
import { icons } from "../assets";

const AddItemForm = ({
  listForm,
  submitHandler,
  title,
  onChangeHandler,
  setEditMode,
}) => {
  const createHandler = (e) => {
    e.stopPropagation();
    if (!title) {
      return alert("Please Provide a valid title");
    }
    submitHandler(e);
  };
  return (
    <div className="form-container">
      <div className="form-card">
        <form action="">
          <textarea
            className="form-textarea"
            name=""
            id=""
            cols="30"
            rows="2"
            value={title}
            onChange={onChangeHandler}
          ></textarea>
        </form>
      </div>
      <div className="button-container">
        <button onClick={createHandler} className="add-button">
            {listForm?'Add List':'Add Task'}
        </button>
        <img src={icons.crossIcon} alt="" onClick={(e)=>{
            e.stopPropagation();
            setEditMode(false)
        }} className="form-icon" />
      </div>
    </div>
  );
};

export default AddItemForm;
