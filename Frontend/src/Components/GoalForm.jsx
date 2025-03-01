import React, { useState } from 'react'
import {useDispatch ,useSelector} from 'react-redux';
import {createGoal,getGoals} from '../Features/Goals/GoalSlice'

function GoalForm() {
  const [text,setText] = useState('')
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)
  const onSubmit=async (e)=>{
    e.preventDefault();
    await dispatch(createGoal({text}))
    dispatch(getGoals(user.token))
    setText('')
  }

  return (
    <div>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Goal</label>
            <input type='text' value={text} id='text' name='text' 
            onChange={(e)=>setText(e.target.value)}/>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type='submit'>Add Goal</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default GoalForm