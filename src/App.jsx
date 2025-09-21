import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import TaskCard from './components/TaskCard';
import AddTaskModal from './components/AddTaskModal';

function formatISO(date) {
  if (!date) return null;
  if (typeof date === 'string') return date;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function App() {
  const COLORS = {
    todo: 'rgba(80, 48, 229, 1)',
    inprogress: 'rgba(255, 165, 0, 1)',
    done: 'rgba(118, 165, 234, 1)',
  };

  const tasksState = useSelector((s) => s.tasks || {});
  let taskArray = [];
  if (Array.isArray(tasksState.tasks)) {
    taskArray = tasksState.tasks;
  } else if (tasksState.tasks && typeof tasksState.tasks === 'object') {
    taskArray = Object.values(tasksState.tasks);
  }

  const hasColumns =
    tasksState.columns &&
    typeof tasksState.columns === 'object' &&
    tasksState.tasks &&
    typeof tasksState.tasks === 'object';

  const [searchText, setSearchText] = useState('');
  const [filterPriority, setFilterPriority] = useState([]);
  const [dateFilter, setDateFilter] = useState(null);

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  // refs for bottom controls (Filter/Today)
  const filterRefBottom = useRef(null);
  const calendarRefBottom = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const insideFilter = filterRefBottom.current && filterRefBottom.current.contains(e.target);
      const insideCalendar = calendarRefBottom.current && calendarRefBottom.current.contains(e.target);

      if (!insideFilter) setFilterMenuOpen(false);
      if (!insideCalendar) setCalendarOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const togglePriority = (p) =>
    setFilterPriority((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );

  const handleDateChange = (ev) => {
    const v = ev.target.value || null;
    setDateFilter(v);
  };

  const handleShare = async () => {
    const payload = { columns: tasksState.columns || null, tasks: tasksState.tasks || taskArray };
    try {
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      alert('Board JSON copied to clipboard');
    } catch (e) {
      console.log(payload);
      alert('Could not copy to clipboard — check console');
    }
  };

  const handleInviteSend = () => {
    if (!inviteEmail || !inviteEmail.includes('@')) return alert('Enter valid email');
    alert(`Invite sent to ${inviteEmail} (demo)`);
    setInviteEmail('');
    setInviteOpen(false);
  };

  let groupedTasks = { todo: [], inprogress: [], done: [] };
  if (hasColumns) {
    const cols = tasksState.columns;
    const tasksMap = tasksState.tasks;
    groupedTasks = {
      todo: (cols.todo?.taskIds || []).map((id) => tasksMap[id]).filter(Boolean),
      inprogress: (cols.inprogress?.taskIds || cols['in-progress']?.taskIds || []).map((id) => tasksMap[id]).filter(Boolean),
      done: (cols.done?.taskIds || []).map((id) => tasksMap[id]).filter(Boolean),
    };
  } else {
    groupedTasks = {
      todo: taskArray.filter((t) => (t?.status || '').toLowerCase() === 'to do' || t?.status === 'To Do'),
      inprogress: taskArray.filter((t) => (t?.status || '').toLowerCase() === 'on progress' || t?.status === 'On Progress'),
      done: taskArray.filter((t) => (t?.status || '').toLowerCase() === 'done' || t?.status === 'Done'),
    };
  }

  const taskMatchesFilters = (task) => {
    if (!task) return false;
    if (searchText) {
      const s = searchText.toLowerCase();
      const inTitle = (task.title || '').toLowerCase().includes(s);
      const inDesc = (task.description || '').toLowerCase().includes(s);
      if (!inTitle && !inDesc) return false;
    }
    if (filterPriority.length > 0) {
      if (!filterPriority.includes(task.priority || 'Low')) return false;
    }
    if (dateFilter) {
      if (formatISO(task.dueDate) !== formatISO(dateFilter)) return false;
    }
    return true;
  };

  const filteredGrouped = {
    todo: groupedTasks.todo.filter(taskMatchesFilters),
    inprogress: groupedTasks.inprogress.filter(taskMatchesFilters),
    done: groupedTasks.done.filter(taskMatchesFilters),
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-[56px] py-6">
          {/* Topbar - only profile here (no small stacked avatars) */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div style={{ width: 460 }}>
                <div className="relative">
                  <input
                    placeholder="Search for anything..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 topbar-search text-sm"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <img src="/icons/search.png" alt="search" width="18" height="18" />
                  </div>
                </div>
              </div>
            </div>

            {/* right micro icons + profile only */}
            <div className="flex items-center gap-3">
              <button className="micro-icon-btn"><img src="/icons/help.png" alt="calendar" width="16" height="16" /></button>
              <button className="micro-icon-btn"><img src="/icons/bell.png" alt="help" width="16" height="16" /></button>
              <button className="micro-icon-btn"><img src="/icons/quick.png" alt="bell" width="16" height="16" /></button>

              <div className="flex items-center gap-3 ml-2">
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium">Palak Jain</div>
                  <div className="text-xs text-[#787486]">Rajasthan, India</div>
                </div>

                <img src="/avatars/profile.png" className="w-10 h-10 rounded-full border-2 border-white shadow-md" alt="profile" />
              </div>
            </div>
          </div>

          {/* Header: H1 + Filter/Today below and Invite with stacked avatars on right */}
          <div className="mb-6">
            <header className="mb-6 flex items-start justify-between">
              <div className="pr-6">
                <div className="flex items-center gap-3">
                  <h1 className="text-[46px] font-semibold leading-none text-[#0D062D]">Mobile App</h1>
                  <div className="flex items-center ml-3 gap-2">
                    <img src="/icons/g643-1.png" alt="g1" width="20" height="20" style={{ borderRadius: 6 }} />
                    <img src="/icons/g643-2.png" alt="g2" width="20" height="20" style={{ borderRadius: 6 }} />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  {/* Filter (bottom) */}
                  <div style={{ position: 'relative' }} ref={filterRefBottom}>
                    <button onClick={() => setFilterMenuOpen((v) => !v)} className="topbar-control">
                      <img src="/icons/filter.png" alt="filter" width="14" height="14" />
                      <span>Filter</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 6 }}>
                        <path d="M6 9l6 6 6-6" stroke="rgba(120,116,134,1)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {filterMenuOpen && (
                      <div className="absolute top-[46px] left-0 z-50 w-[260px] bg-white p-3 rounded shadow-md border">
                        <div className="text-sm font-medium mb-2">Filter by priority</div>
                        <div className="flex gap-2">
                          {['Low','Medium','High','Completed'].map((p) => (
                            <button
                              key={p}
                              onClick={() => togglePriority(p)}
                              className={`text-sm px-2 py-1 rounded ${filterPriority.includes(p) ? 'bg-[#5030E5] text-white' : 'bg-white text-[#0D062D] border'}`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Today (bottom) */}
                  <div style={{ position: 'relative' }} ref={calendarRefBottom}>
                    <button onClick={() => setCalendarOpen((v) => !v)} className="topbar-control">
                      <img src="/icons/calendar.svg" alt="calendar" width="14" height="14" />
                      <span>{dateFilter ? dateFilter : 'Today'}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 6 }}>
                        <path d="M6 9l6 6 6-6" stroke="rgba(120,116,134,1)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {calendarOpen && (
                      <div className="absolute top-[46px] left-0 z-50 w-[260px] bg-white p-3 rounded shadow-md border">
                        <label className="text-xs text-[#787486]">Filter by date</label>
                        <input type="date" value={dateFilter || ''} onChange={handleDateChange} className="p-2 border rounded w-full mt-2" />
                        <div className="mt-2 flex justify-between">
                          <button onClick={() => { setDateFilter(null); setCalendarOpen(false); }} className="text-sm text-[#5030E5]">Clear</button>
                          <button onClick={() => setCalendarOpen(false)} className="text-sm text-[#5030E5]">Done</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: stacked avatars next to +Invite, then Share */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3 items-center mr-2">
                    <img src="/avatars/research.png" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="research" />
                    <img src="/avatars/default.png" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" alt="default" />
                  </div>
                  <button onClick={() => setInviteOpen((v) => !v)} className="text-sm px-3 py-1 rounded-md border border-[#EDE7FF] bg-white text-[#5030E5]">+ Invite</button>
                </div>
                <div className="mt-1">
                  <button onClick={handleShare} className="w-10 h-10 rounded-md bg-[#5030E5] text-white flex items-center justify-center shadow-md">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><path d="M8.59 13.51l7.83 3.98"/></svg>
                  </button>
                </div>
              </div>
            </header>
          </div>

          {/* Board */}
          <main>
            <div className="grid grid-cols-3 gap-6">
              {['todo','inprogress','done'].map((status) => (
                <div key={status}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[status] }}></span>
                      <h2 className="text-lg font-semibold">
                        {status === 'todo' ? 'To Do' : status === 'inprogress' ? 'On Progress' : 'Done'}
                      </h2>
                    </div>
                    {status === 'todo' && (
                      <button onClick={openModal} className="w-6 h-6 flex items-center justify-center rounded-full text-white" style={{ background: COLORS.todo }}>+</button>
                    )}
                  </div>
                  <div className="h-1 rounded mt-2 mb-4" style={{ background: COLORS[status] }} />
                  {filteredGrouped[status].map((task) => (
                    <TaskCard key={task.id ?? task._id ?? Math.random()} task={task} />
                  ))}
                </div>
              ))}
            </div>
          </main>
        </main>
      </div>

      {isModalOpen && <AddTaskModal onClose={closeModal} />}

      {inviteOpen && (
        <div className="fixed right-6 top-24 bg-white p-4 rounded shadow-lg border">
          <div className="text-sm font-medium mb-2">Invite teammate</div>
          <input className="border p-2 rounded w-64" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="email@example.com" />
          <div className="mt-2 flex justify-end gap-2">
            <button onClick={() => setInviteOpen(false)} className="px-3 py-1">Cancel</button>
            <button onClick={handleInviteSend} className="px-3 py-1 bg-[#5030E5] text-white rounded">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
