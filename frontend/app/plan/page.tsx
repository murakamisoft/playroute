"use client";

import { useState } from "react";
import Link from "next/link";

export default function PlanPage() {
    const [form, setForm] = useState({
        startTime: "",
        endTime: "",
        budget: "",
        interests: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`仮生成しました！\n${JSON.stringify(form, null, 2)}`);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-100">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    プラン生成フォーム
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label className="text-gray-700">
                        日時（開始）
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={form.startTime}
                            onChange={handleChange}
                            className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </label>

                    <label className="text-gray-700">
                        日時（終了）
                        <input
                            type="datetime-local"
                            name="endTime"
                            value={form.endTime}
                            onChange={handleChange}
                            className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </label>

                    <label className="text-gray-700">
                        予算（円）
                        <input
                            type="number"
                            name="budget"
                            value={form.budget}
                            onChange={handleChange}
                            className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </label>

                    <label className="text-gray-700">
                        興味（カンマ区切り）
                        <input
                            type="text"
                            name="interests"
                            placeholder="例: カフェ,ドライブ,水族館"
                            value={form.interests}
                            onChange={handleChange}
                            className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 mt-2 rounded-full shadow-md transition-transform transform hover:scale-105"
                    >
                        プラン生成（仮）
                    </button>
                </form>

                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="text-blue-600 hover:underline text-sm transition-colors"
                    >
                        ← トップへ戻る
                    </Link>
                </div>
            </div>
        </main>
    );
}
