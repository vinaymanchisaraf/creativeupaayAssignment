import { createSlice } from '@reduxjs/toolkit';

// Local storage helpers
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Failed to load state', e);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (e) {
    console.error('Failed to save state', e);
  }
};

// initial state
const initialState = loadState() || {
  columns: {
    todo: { id: 'todo', title: 'To Do', taskIds: ['t1','t2','t3','t4'] },
    inprogress: { id: 'inprogress', title: 'On Progress', taskIds: ['t5','t6','t7'] },
    done: { id: 'done', title: 'Done', taskIds: ['t8','t9'] }
  },
  tasks: {
    t1: { id: 't1', title: 'Brainstorming', description: "Brainstorming brings team members' diverse experience into play.", priority: 'Low', assignees: ['/avatars/default.png'], comments: 12, files: 0, dueDate: null },
    t2: { id: 't2', title: 'Research', description: 'User research helps you to create an optimal product for users.', priority: 'High', assignees: ['/avatars/research.png','/avatars/default.png'], comments: 10, files: 3, dueDate: '2025-09-20' },
    t3: { id: 't3', title: 'Wireframes', description: 'Low fidelity wireframes include the most basic content and visuals.', priority: 'High', assignees: ['/avatars/default.png'], comments: 12, files: 0, dueDate: null },
    t4: { id: 't4', title: 'Ideation', description: 'Ideation session with stakeholders.', priority: 'Low', assignees: ['/avatars/default.png'], comments: 12, files: 0, dueDate: null },
    t5: { id: 't5', title: 'Brainstorming', description: "Brainstorming brings team members' diverse experience into play.", priority: 'Low', assignees: ['/avatars/default.png'], comments: 12, files: 0, dueDate: null },
    t6: { id: 't6', title: 'Brainstorming', description: "Brainstorming brings team members' diverse experience into play.", priority: 'Low', assignees: ['/avatars/default.png'], comments: 12, files: 0, dueDate: null },
    t7: { id: 't7', title: 'Brainstorming', description: "Brainstorming brings team members' diverse experience into play.", priority: 'Low', assignees: ['/avatars/default.png'], comments: 12, files: 0, dueDate: null },
    t8: { id: 't8', title: 'Brainstorming', description: "Brainstorming brings team members' diverse experience into play.", priority: 'Low', assignees: ['/avatars/default.png'], comments: 12, files: 0, dueDate: null },
    t9: { id: 't9', title: 'Design System', description: 'It just needs to adapt the UI from what you did before', priority: 'Completed', assignees: ['/avatars/default.png'], comments: 12, files: 15, dueDate: '2025-09-15' }
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { columnId, task } = action.payload;
      state.tasks[task.id] = task;
      state.columns[columnId].taskIds.push(task.id);
      saveState(state);
    },
    moveTask: (state, action) => {
      const { sourceColumnId, destColumnId, taskId, destIndex } = action.payload;
      const sourceTasks = state.columns[sourceColumnId].taskIds;
      const destTasks = state.columns[destColumnId].taskIds;

      const idx = sourceTasks.indexOf(taskId);
      if (idx !== -1) sourceTasks.splice(idx, 1);

      destTasks.splice(destIndex, 0, taskId);
      saveState(state);
    },
    reorderWithinColumn: (state, action) => {
      const { columnId, sourceIndex, destIndex } = action.payload;
      const col = state.columns[columnId];
      const [removed] = col.taskIds.splice(sourceIndex, 1);
      col.taskIds.splice(destIndex, 0, removed);
      saveState(state);
    }
  }
});

export const { addTask, moveTask, reorderWithinColumn } = tasksSlice.actions;
export default tasksSlice.reducer;
