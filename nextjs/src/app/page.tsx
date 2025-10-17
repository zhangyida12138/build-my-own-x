import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          欢迎使用备忘录系统
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          记录你的想法，管理你的任务
        </p>
        <Link
          href="/memos"
          className="inline-block px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-lg"
        >
          开始使用
        </Link>
      </div>
    </div>
  );
}
