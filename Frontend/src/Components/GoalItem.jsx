import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteGoal, editGoal } from "../Features/Goals/GoalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(goal.text);
  const handleDeleteClick = () => {
    dispatch(deleteGoal(goal._id));
  };
  const handleEditClick = () => {
    setEditing(true);
  };
  const handleKeyDown=(e)=>{
    if(e.key==='Enter'){
      dispatch(editGoal({id:goal._id,userData: {text}}))
      setEditing(false)
    }
  }
  return (
    <div className="goal-card">
      <div className="goal-header">
        <span className="goal-date">
          {new Date(goal.createdAt).toLocaleString("en-US")}
        </span>
      </div>
      {editing ? (
        <input
          type="text"
          value={text}
          id="text"
          name="text"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h2 className="goal-text">{goal.text}</h2>
      )}
      <div className="flex items-center justify-evenly">
        <button onClick={handleDeleteClick} className="close">
          <FaTrash size={24} className="text-gray-800 hover:text-red-600" />
        </button>
        <button onClick={() => handleEditClick()} className="close">
          <FaEdit size={24} className="text-gray-800 hover:text-blue-600" />
        </button>
      </div>
    </div>
  );
}

export default GoalItem;
