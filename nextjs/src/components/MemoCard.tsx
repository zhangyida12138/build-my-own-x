'use client';

import { Memo } from '@/types/memo';
import { useState } from 'react';

interface MemoCardProps {
  memo: Memo;
  onEdit: (memo: Memo) => void;
  onDelete: (id: string) => void;
}

export default function MemoCard({ memo, onEdit, onDelete }: MemoCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm('确定要删除这个备忘录吗？')) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/memos/${memo.id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          onDelete(memo.id);
        } else {
          alert('删除失败');
        }
      } catch (error) {
        alert('删除失败');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-relaxed">{memo.title}</h3>
        <div className="flex justify-center">
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getPriorityColor(memo.priority)}`}>
            {memo.priority === 'high' ? '高优先级' : 
             memo.priority === 'medium' ? '中优先级' : '低优先级'}
          </span>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">{memo.content}</p>
      </div>
      
      {memo.tags && memo.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {memo.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="text-center text-sm text-gray-500 mb-4">
        <p>创建时间: {new Date(memo.createdAt).toLocaleString('zh-CN')}</p>
        {memo.updatedAt !== memo.createdAt && (
          <p>更新时间: {new Date(memo.updatedAt).toLocaleString('zh-CN')}</p>
        )}
      </div>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onEdit(memo)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg shadow-md hover:shadow-lg"
        >
          编辑
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 font-medium text-lg shadow-md hover:shadow-lg"
        >
          {isDeleting ? '删除中...' : '删除'}
        </button>
      </div>
    </div>
  );
}