import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasksSlice';

export default function AddTaskModal({ columnId }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Low');
  const dispatch = useDispatch();

  const submit = () => {
    if (!title.trim()) return alert('Enter a title');
    dispatch(addTask({ columnId, title, description: desc, priority }));
    setTitle(''); setDesc(''); setPriority('Low'); setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="text-sm px-3 py-1 rounded bg-[#5030E5] text-white">+ Add</button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="font-bold mb-2">Add Task</h3>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border mb-2" />
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="w-full p-2 border mb-2" />
            <select value={priority} onChange={e=>setPriority(e.target.value)} className="w-full p-2 border mb-2">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={()=>setOpen(false)} className="px-3 py-1">Cancel</button>
              <button onClick={submit} className="px-3 py-1 bg-[#5030E5] text-white rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
