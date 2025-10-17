import { NextRequest, NextResponse } from 'next/server';
import { MemoStore } from '@/lib/data';
import { CreateMemoRequest } from '@/types/memo';

// GET /api/memos/[id] - 获取单个备忘录
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memo = await MemoStore.getMemoById(params.id);
    
    if (!memo) {
      return NextResponse.json(
        { error: '备忘录不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(memo);
  } catch (error) {
    return NextResponse.json(
      { error: '获取备忘录失败' },
      { status: 500 }
    );
  }
}

// PUT /api/memos/[id] - 更新备忘录
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates: Partial<CreateMemoRequest> = await request.json();
    const updatedMemo = await MemoStore.updateMemo(params.id, updates);
    
    if (!updatedMemo) {
      return NextResponse.json(
        { error: '备忘录不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedMemo);
  } catch (error) {
    return NextResponse.json(
      { error: '更新备忘录失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/memos/[id] - 删除备忘录
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await MemoStore.deleteMemo(params.id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: '备忘录不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    return NextResponse.json(
      { error: '删除备忘录失败' },
      { status: 500 }
    );
  }
}
