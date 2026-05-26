'use client';

import { useState } from 'react';
import { CheckSquare, Plus, Trash2, Check, Circle } from 'lucide-react';

interface TodoItem {
  id: number;
  text: string;
  done: boolean;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

const INITIAL_TODOS: TodoItem[] = [
  { id: 1, text: 'Review 50 hours of Hindi audio batches (Batch TXN-2048)', done: false, priority: 'high', createdAt: 'Today' },
  { id: 2, text: 'Update QC checklist for rural dialect recordings', done: false, priority: 'high', createdAt: 'Today' },
  { id: 3, text: 'Coordinate with Vendor B on Tamil batch resubmission', done: false, priority: 'medium', createdAt: 'Yesterday' },
  { id: 4, text: 'Review noise augmentation experiment results (EXP-001)', done: true, priority: 'medium', createdAt: 'Yesterday' },
  { id: 5, text: 'Export monthly transcription report for stakeholders', done: false, priority: 'low', createdAt: 'Sep 18' },
  { id: 6, text: 'Update onboarding documentation for new field collectors', done: true, priority: 'low', createdAt: 'Sep 15' },
];

const priorityColor: Record<string, string> = {
  high: 'bg-red-50 text-red-600 border-red-100',
  medium: 'bg-amber-50 text-amber-700 border-amber-100',
  low: 'bg-slate-100 text-slate-500 border-slate-200',
};

export default function TodoPage() {
  const [todos, setTodos] = useState<TodoItem[]>(INITIAL_TODOS);
  const [newText, setNewText] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');

  function toggleTodo(id: number) {
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function addTodo() {
    const text = newText.trim();
    if (!text) return;
    setTodos((prev) => [
      { id: Date.now(), text, done: false, priority: newPriority, createdAt: 'Just now' },
      ...prev,
    ]);
    setNewText('');
  }

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  const done = todos.filter((t) => t.done).length;
  const total = todos.length;

  return (
    <div className="flex flex-col gap-6 p-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckSquare size={20} className="text-slate-500" />
          <div>
            <h1 className="text-xl font-semibold text-slate-900">To-Do List</h1>
            <p className="mt-0.5 text-sm text-slate-500">
              {done}/{total} tasks completed
            </p>
          </div>
        </div>
        {/* Progress */}
        <div className="flex items-center gap-2">
          <div className="w-32 h-1.5 rounded-full bg-slate-100">
            <div
              className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
              style={{ width: total > 0 ? `${(done / total) * 100}%` : '0%' }}
            />
          </div>
          <span className="text-xs font-medium text-slate-500">
            {total > 0 ? Math.round((done / total) * 100) : 0}%
          </span>
        </div>
      </div>

      {/* Add new task */}
      <div className="flex gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Add a new task…"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value as 'high' | 'medium' | 'low')}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button
          onClick={addTodo}
          disabled={!newText.trim()}
          className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-40"
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 rounded-xl bg-slate-100 p-1 w-fit">
        {(['all', 'active', 'done'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-all capitalize ${
              filter === f
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Todo list */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-400">
            No tasks here yet.
          </div>
        )}
        {filtered.map((todo) => (
          <div
            key={todo.id}
            className={`group flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-sm transition-all ${
              todo.done ? 'opacity-60' : 'hover:shadow-md'
            }`}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`mt-0.5 shrink-0 flex size-5 items-center justify-center rounded-full border-2 transition-all ${
                todo.done
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : 'border-slate-300 hover:border-blue-400'
              }`}
            >
              {todo.done ? <Check size={10} /> : <Circle size={10} className="opacity-0" />}
            </button>

            <div className="flex-1 min-w-0">
              <p className={`text-sm text-slate-800 leading-relaxed ${todo.done ? 'line-through text-slate-400' : ''}`}>
                {todo.text}
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${priorityColor[todo.priority]}`}>
                  {todo.priority}
                </span>
                <span className="text-[10px] text-slate-400">{todo.createdAt}</span>
              </div>
            </div>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-red-400"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
