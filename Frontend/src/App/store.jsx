import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../Features/Auth/AuthSlice'
import goalReducer from '../Features/Goals/GoalSlice'

export const store  = configureStore({
    reducer:{
        auth:authReducer,
        goals:goalReducer,
    }
})