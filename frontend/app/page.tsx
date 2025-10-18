"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="p-10 rounded-3xl shadow-xl bg-white/80 backdrop-blur-sm"
            >
                <div className="flex items-center justify-center gap-2 mb-4 text-blue-600">
                    <Sparkles className="w-6 h-6" />
                    <span className="font-semibold">Weekend Fun Generator</span>
                </div>

                <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-gray-800">
                    PlayRoute
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                    週末の「遊び」を、自動でデザインしよう。
                </p>

                <Link
                    href="/plan"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition-transform transform hover:scale-105"
                >
                    プランを作る →
                </Link>
            </motion.div>
        </div>
    );
}
