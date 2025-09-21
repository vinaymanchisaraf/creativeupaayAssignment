import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: [
    { id: 'p1', title: 'Mobile App', dotColor: '#76A5EA' },
    { id: 'p2', title: 'Website Redesign', dotColor: '#FFA500' },
    { id: 'p3', title: 'Design System', dotColor: '#D58D49' },
    { id: 'p4', title: 'Wireframes', dotColor: '#76A5EA' },
  ],
  activeProjectId: 'p1'
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setActiveProject(state, action) {
      state.activeProjectId = action.payload;
    },
    reorderProjects(state, action) {
      const { sourceIndex, destIndex } = action.payload;
      const [moved] = state.items.splice(sourceIndex, 1);
      state.items.splice(destIndex, 0, moved);
    },
    addProject(state, action) {
      const id = uuidv4();
      state.items.push({ id, title: action.payload.title, dotColor: action.payload.dotColor || '#5030E5' });
    },
  }
});

export const { setActiveProject, reorderProjects, addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
