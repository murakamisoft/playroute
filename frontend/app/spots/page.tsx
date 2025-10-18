"use client";

import Link from "next/link";

type Spot = {
    spotName: string;
    type: string;
    cost: number;
};

export default function SpotsPage() {
    // モックデータ
    const spots: Spot[] = [
        { spotName: "渋谷カフェ", type: "カフェ", cost: 1200 },
        { spotName: "奥多摩キャンプ場", type: "キャンプ", cost: 5000 },
    ];

    return (
        <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">スポット一覧 📍</h1>

            <div className="w-full max-w-md flex flex-col gap-4">
                {spots.map((spot, index) => (
                    <div
                        key={index}
                        className="p-4 border rounded-lg bg-white/80 shadow-sm flex justify-between items-center"
                    >
                        <div>
                            <h2 className="font-semibold">{spot.spotName}</h2>
                            <p className="text-sm text-gray-600">{spot.type}</p>
                        </div>
                        <p className="font-semibold">¥{spot.cost}</p>
                    </div>
                ))}

                <Link
                    href="/plan/create"
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-center transition-transform transform hover:scale-105"
                >
                    ← プラン生成に戻る
                </Link>
            </div>
        </main>
    );
}
