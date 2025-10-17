import { Memo, CreateMemoRequest } from '@/types/memo';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'data', 'memos.json');

export class MemoStore {
  private static async ensureDataFile() {
    const fs = await import('fs');
    const path = await import('path');
    
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    if (!fs.existsSync(DATA_FILE)) {
      await writeFile(DATA_FILE, JSON.stringify([], null, 2));
    }
  }

  static async getAllMemos(): Promise<Memo[]> {
    await this.ensureDataFile();
    const data = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  }

  static async getMemoById(id: string): Promise<Memo | null> {
    const memos = await this.getAllMemos();
    return memos.find(memo => memo.id === id) || null;
  }

  static async createMemo(memoData: CreateMemoRequest): Promise<Memo> {
    const memos = await this.getAllMemos();
    const newMemo: Memo = {
      id: crypto.randomUUID(),
      ...memoData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    memos.push(newMemo);
    await writeFile(DATA_FILE, JSON.stringify(memos, null, 2));
    return newMemo;
  }

  static async updateMemo(id: string, updates: Partial<CreateMemoRequest>): Promise<Memo | null> {
    const memos = await this.getAllMemos();
    const index = memos.findIndex(memo => memo.id === id);
    
    if (index === -1) return null;
    
    memos[index] = {
      ...memos[index],
      ...updates,
      updatedAt: new Date(),
    };
    
    await writeFile(DATA_FILE, JSON.stringify(memos, null, 2));
    return memos[index];
  }

  static async deleteMemo(id: string): Promise<boolean> {
    const memos = await this.getAllMemos();
    const filteredMemos = memos.filter(memo => memo.id !== id);
    
    if (filteredMemos.length === memos.length) return false;
    
    await writeFile(DATA_FILE, JSON.stringify(filteredMemos, null, 2));
    return true;
  }
}
