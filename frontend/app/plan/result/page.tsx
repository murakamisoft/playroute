"use client";

import Link from "next/link";

type Spot = {
    spotName: string;
    duration: string;
    cost: number;
};

type Plan = {
    totalCost: number;
    spots: Spot[];
};

export default function PlanResultPage() {
    // モックデータ
    const plan: Plan = {
        totalCost: 6200,
        spots: [
            { spotName: "渋谷カフェ", duration: "02:00", cost: 1200 },
            { spotName: "奥多摩キャンプ場", duration: "05:00", cost: 5000 },
        ],
    };

    return (
        <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">プラン生成結果 🎯</h1>

            <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col gap-4">
                {plan.spots.map((spot, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50">
                        <h2 className="font-semibold text-lg">{spot.spotName}</h2>
                        <p>滞在時間: {spot.duration}</p>
                        <p>費用: ¥{spot.cost}</p>
                    </div>
                ))}

                <div className="mt-4 font-bold text-right text-gray-700">
                    合計費用: ¥{plan.totalCost}
                </div>

                <Link
                    href="/plan/create"
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-center transition-transform transform hover:scale-105"
                >
                    ← 条件入力に戻る
                </Link>
            </div>
        </main>
    );
}
