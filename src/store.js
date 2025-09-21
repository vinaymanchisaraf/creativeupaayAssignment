import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasksSlice';
import projectsReducer from './features/projectsSlice';

const store = configureStore({
  reducer: { tasks: tasksReducer, projects: projectsReducer }
});

export default store;
