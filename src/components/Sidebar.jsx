import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveProject } from '../features/projectsSlice';

const Icon = ({ name }) => {
  if (name === 'home') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#787486" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 4l9 5.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>
  );
  if (name === 'messages') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#787486" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  );
  if (name === 'tasks') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#787486" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
  );
  if (name === 'members') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#787486" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
  );
  if (name === 'settings') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#787486" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.4 4.6l.9 2.4a6.5 6.5 0 0 0 0 6.9l-.9 2.4L12 17l1.6 1.3 1.6-1.3.9-2.4a6.5 6.5 0 0 0 0-6.9l-.9-2.4L12 7 9.4 4.6z"/></svg>
  );
  return null;
};

export default function Sidebar() {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects.items);
  const activeId = useSelector(state => state.projects.activeProjectId);

  const onSelect = (id) => dispatch(setActiveProject(id));

  const navItems = [
    { key: 'Home', icon: 'home' },
    { key: 'Messages', icon: 'messages' },
    { key: 'Tasks', icon: 'tasks' },
    { key: 'Members', icon: 'members' },
    { key: 'Settings', icon: 'settings' },
  ];

  return (
    <aside className="w-[260px] bg-white h-screen pt-6 pb-8 px-6 border-r border-[rgba(0,0,0,0.03)]">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-[8px] bg-[#5030E5] flex items-center justify-center text-white font-bold">P</div>
        <div className="font-semibold text-sm text-[#0D062D]">Project M.</div>
      </div>

      <nav className="mb-6 space-y-3">
        {navItems.map((item) => (
          <div key={item.key} className="flex items-center gap-3 py-2 text-base font-medium text-[#787486] cursor-pointer">
            <div className="w-6 h-6 rounded flex items-center justify-center text-[#787486]">
              <Icon name={item.icon} />
            </div>
            <div>{item.key}</div>
          </div>
        ))}
      </nav>

      <div className="text-xs font-medium uppercase text-[#787486] mb-2">My Projects</div>

      <div className="space-y-2 mb-6">
        {projects.map((p) => {
          const isActive = p.id === activeId;
          return (
            <div
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={`flex items-center justify-between gap-3 p-2 rounded-lg cursor-pointer transition-all ${isActive ? '' : 'hover:bg-gray-50'}`}
              style={{
                background: isActive ? 'rgba(80,48,229,0.08)' : undefined,
                borderLeft: isActive ? '4px solid #5030E5' : undefined,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ background: p.dotColor || '#5030E5' }} />
                <div className="text-base font-medium text-[#0D062D]">{p.title}</div>
              </div>

              <div className="text-sm text-[#787486]">...</div>
            </div>
          );
        })}
      </div>

      <div className="mt-auto">
        <div className="bg-white rounded-[12px] p-4 border border-[rgba(0,0,0,0.04)]">
          <div className="font-semibold text-sm text-[#0D062D] mb-2">Thoughts Time</div>
          <p className="text-xs text-[#787486] mb-3">
            We don't have any notice for you, till then you can share your thoughts with your peers.
          </p>
          <button className="w-full text-sm py-2 rounded bg-[#5030E5] text-white">Write a message</button>
        </div>
      </div>
    </aside>
  );
}
