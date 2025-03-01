import axios from "axios";

const API_URL = 'https://goal-setter-hwu8.onrender.com/api/goals/'

const createGoal = async(goalData,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL,goalData,config)
    return response.data
}

const getGoals = async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,config)
    return response.data
}

const editGoal = async(id,token,userData)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL+id,userData,config)
    console.log(response.data)
    return response.data
}

const deleteGoal = async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+id,config)
    return response.data.id
}

const GoalService = {
    createGoal,getGoals,deleteGoal,editGoal
}
export default GoalService