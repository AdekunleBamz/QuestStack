/**
 * CreateQuestForm Component
 * Form for creating new quests
 * 
 * @component
 */

'use client';

import { useState } from 'react';

interface CreateQuestFormProps {
  onCreate?: (title: string, description: string, reward: number, deadline: number) => void;
}

export function CreateQuestForm({ onCreate }: CreateQuestFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [days, setDays] = useState('7');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const deadline = Math.floor(Date.now() / 1000) + parseInt(days) * 86400;
    onCreate?.(title, description, parseFloat(reward) * 1000000, deadline);
    setTitle('');
    setDescription('');
    setReward('');
  };

  return (
    <form onSubmit={handleSubmit} className="create-quest-form">
      <h3>Create New Quest</h3>
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quest Title"
        required
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Quest Description"
        required
      />
      
      <input
        type="number"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
        placeholder="Reward (QST)"
        step="0.000001"
        required
      />
      
      <input
        type="number"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        placeholder="Days until deadline"
        required
      />
      
      <button type="submit">Create Quest</button>
    </form>
  );
}
