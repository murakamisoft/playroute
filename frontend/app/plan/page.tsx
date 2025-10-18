"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function PlanPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        startTime: "",
        endTime: "",
        budget: "",
        interests: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 興味をカンマ区切りから配列に変換
            const spotsArray = form.interests
                ? form.interests.split(",").map((s) => s.trim()).filter(Boolean)
                : [];

            // 送信する JSON を作成
            const requestData = {
                userId: 1, // 仮: ログインユーザーID
                startTime: form.startTime,
                endTime: form.endTime,
                spots: spotsArray
            };

            // デバッグ用ログ出力
            console.log("送信するJSON:", JSON.stringify(requestData, null, 2));

            const response = await axios.post("http://localhost:8080/api/plans", requestData);


            const planId = (response.data as { plan_id: number }).plan_id;
            router.push(`/plan/result?planId=${planId}`);
        } catch (err) {
            console.error(err);
            alert("プラン生成に失敗しました。");
        } finally {
            setLoading(false);
        }
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
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 mt-2 rounded-full shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "生成中..." : "プラン生成（仮）"}
                    </button>
                </form>
            </div>
        </main>
    );
}
