import React from 'react';

export default function TaskCard({ task }) {
  const priority = task.priority || 'Low';
  const tagBg =
    priority === 'Low'
      ? '#D58D49'
      : priority === 'High'
      ? '#D8727D'
      : priority === 'Completed'
      ? '#68B266'
      : '#E5E7EB';

  // Helper to render assignees
  const renderAssignees = (assignees = []) =>
    (assignees || []).map((a, i) =>
      a ? (
        <img
          key={i}
          src={a}
          alt=""
          className="w-7 h-7 rounded-full border-2 border-white"
          style={{ zIndex: 30 }}
        />
      ) : (
        <div
          key={i}
          className="w-7 h-7 rounded-full border-2 border-white bg-[#E5E7EB]"
          style={{ zIndex: 30 }}
        />
      )
    );

  // Special design for "Research"
  if (task.title === 'Research') {
    return (
      <div className="relative mb-6">
        {/* BACKGROUND rectangle */}
        <div
          aria-hidden
          className="absolute"
          style={{
            top: '2px',
            left: '12px',
            right: '-4px',
            bottom: '-12px',
            borderRadius: '10px',
            background: 'rgba(80,48,229,0.06)',
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderColor: 'rgba(80,48,229,0.59)',
            boxShadow: '0 16px 28px rgba(80,48,229,0.10)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* FOREGROUND slanted Research card */}
        <div
          className="relative rounded-[16px] bg-white p-[18px]"
          style={{
            transform: 'rotate(1.6deg)',
            border: '1px solid #5030E5',
            boxShadow:
              '0 6px 18px rgba(13,6,45,0.06), 0 2px 8px rgba(80,48,229,0.08)',
            zIndex: 10,
            marginTop: '-6px', // lift card upwards so background shows more
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <span
              className="text-xs font-medium px-2 py-1 rounded text-white"
              style={{ background: tagBg }}
            >
              {priority}
            </span>
            <div className="text-sm text-[#787486]">
              <button className="p-1">⋯</button>
            </div>
          </div>

          <h3 className="text-lg font-semibold leading-none text-[#0D062D] mt-3">
            {task.title}
          </h3>

          <p className="text-xs font-normal leading-[16px] text-[#787486] mt-2 max-w-[320px]">
            {task.description ||
              'User research helps you to create an optimal product for users.'}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex -space-x-2 items-center">{renderAssignees(task.assignees)}</div>

            <div className="flex items-center gap-4 text-[#787486] text-xs font-medium">
              <div className="flex items-center gap-2">
                <span>{task.comments ?? 0} comments</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{task.files ?? 0} files</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default design for other tasks
  return (
    <div className="bg-white rounded-[16px] p-[18px] mb-4 border border-[rgba(0,0,0,0.04)] shadow-none">
      <div className="flex items-start justify-between gap-2">
        <span
          className="text-xs font-medium px-2 py-1 rounded text-white"
          style={{ background: tagBg }}
        >
          {priority}
        </span>
        <div className="text-sm text-[#787486]">
          <button className="p-1">⋯</button>
        </div>
      </div>

      <h3 className="text-lg font-semibold leading-none text-[#0D062D] mt-3">
        {task.title || 'Untitled task'}
      </h3>

      <p className="text-xs font-normal leading-[16px] text-[#787486] mt-2 max-w-[320px]">
        {task.description || 'No description provided.'}
      </p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex -space-x-2 items-center">
          {renderAssignees(task.assignees)}
        </div>

        <div className="flex items-center gap-4 text-[#787486] text-xs font-medium">
          <div className="flex items-center gap-2">
            <span>{task.comments ?? 0} comments</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{task.files ?? 0} files</span>
          </div>
        </div>
      </div>
    </div>
  );
}
