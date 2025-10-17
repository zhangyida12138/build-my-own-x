import { NextRequest, NextResponse } from 'next/server';
import { MemoStore } from '@/lib/data';
import { CreateMemoRequest } from '@/types/memo';

// GET /api/memos - 获取所有备忘录
export async function GET() {
  try {
    const memos = await MemoStore.getAllMemos();
    return NextResponse.json(memos);
  } catch (error) {
    return NextResponse.json(
      { error: '获取备忘录失败' },
      { status: 500 }
    );
  }
}

// POST /api/memos - 创建新备忘录
export async function POST(request: NextRequest) {
  try {
    const body: CreateMemoRequest = await request.json();
    
    // 验证必填字段
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: '标题和内容不能为空' },
        { status: 400 }
      );
    }

    const newMemo = await MemoStore.createMemo(body);
    return NextResponse.json(newMemo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '创建备忘录失败' },
      { status: 500 }
    );
  }
}
