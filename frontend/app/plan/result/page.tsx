"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

type Spot = {
    spotName: string;
    duration?: string;
    cost?: number;
};

export default function PlanResultPage() {
    const searchParams = useSearchParams();
    const planId = searchParams.get("planId");
    const [spots, setSpots] = useState<Spot[]>([]);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpots = async () => {
            if (!planId) return;

            try {
                console.log("結果 送信するplanId:", planId);
                const res = await axios.get(`http://localhost:8080/api/spots/${planId}`);
                console.log("結果 受信レスポンス:", res.data);

                // 受信レスポンスが配列 or オブジェクトかを考慮
                const data = Array.isArray(res.data) ? res.data : res.data.spots || [];

                setSpots(data);
                // 合計費用を自動計算（バックエンドで返す場合はこの処理不要）
                const total = data.reduce((sum, s) => sum + (s.cost || 0), 0);
                setTotalCost(total);
            } catch (err) {
                console.error(err);
                alert("スポット情報の取得に失敗しました。");
            } finally {
                setLoading(false);
            }
        };

        fetchSpots();
    }, [planId]);

    if (loading) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100">
                <p className="text-gray-600 text-lg">読み込み中...</p>
            </main>
        );
    }

    if (spots.length === 0) {
        return (
            <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100">
                <p className="text-gray-600 text-lg">スポット情報が見つかりません。</p>
                <Link href="/plan" className="mt-4 text-blue-600 hover:underline">
                    ← 条件入力に戻る
                </Link>
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">プラン生成結果 🎯</h1>

            <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col gap-4">
                {spots.map((spot, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50">
                        <h2 className="font-semibold text-lg">{spot.spotName}</h2>
                        {spot.duration && <p>滞在時間: {spot.duration}</p>}
                        {spot.cost !== undefined && <p>費用: ¥{spot.cost}</p>}
                    </div>
                ))}

                <div className="mt-4 font-bold text-right text-gray-700">
                    合計費用: ¥{totalCost}
                </div>

                <Link
                    href="/plan"
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-center transition-transform transform hover:scale-105"
                >
                    ← 条件入力に戻る
                </Link>
            </div>
        </main>
    );
}
