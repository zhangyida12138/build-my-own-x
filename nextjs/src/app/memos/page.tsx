'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Memo } from '@/types/memo';
import MemoCard from '@/components/MemoCard';
import MemoForm from '@/components/MemoForm';
import { CreateMemoRequest } from '@/types/memo';

export default function MemosPage() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    try {
      const response = await fetch('/api/memos');
      if (response.ok) {
        const data = await response.json();
        setMemos(data);
      }
    } catch (error) {
      console.error('获取备忘录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMemo = async (data: CreateMemoRequest) => {
    try {
      const response = await fetch('/api/memos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchMemos();
        setShowForm(false);
      } else {
        throw new Error('创建失败');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateMemo = async (data: CreateMemoRequest) => {
    if (!editingMemo) return;

    try {
      const response = await fetch(`/api/memos/${editingMemo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchMemos();
        setEditingMemo(null);
      } else {
        throw new Error('更新失败');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteMemo = (id: string) => {
    setMemos(memos.filter(memo => memo.id !== id));
  };

  const handleEditMemo = (memo: Memo) => {
    setEditingMemo(memo);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">我的备忘录</h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            📝 新建备忘录
          </button>
        </div>
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingMemo ? '编辑备忘录' : '新建备忘录'}
            </h2>
            <MemoForm
              memo={editingMemo || undefined}
              onSubmit={editingMemo ? handleUpdateMemo : handleCreateMemo}
              onCancel={() => {
                setShowForm(false);
                setEditingMemo(null);
              }}
            />
          </div>
        )}
          {memos.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 text-8xl mb-6">📝</div>
              <h3 className="text-2xl text-gray-600 mb-4">还没有备忘录</h3>
              <p className="text-lg text-gray-500">点击"新建备忘录"开始记录吧！</p>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {memos.map((memo) => (
                  <MemoCard
                    key={memo.id}
                    memo={memo}
                    onEdit={handleEditMemo}
                    onDelete={handleDeleteMemo}
                  />
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
