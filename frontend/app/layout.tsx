import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "PlayRoute",
    description: "週末をデザインする大人のための遊びプラン生成アプリ",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body className={`${inter.className} bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800`}>
                <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-gray-100">
                    <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-3">
                        <Link href="/" className="text-xl font-bold text-blue-700 tracking-tight">
                            PlayRoute 🎯
                        </Link>
                        <nav className="flex gap-6 text-gray-600 text-sm">
                            <Link href="/plan" className="hover:text-blue-600 transition">プラン生成</Link>
                            <Link href="/history" className="hover:text-blue-600 transition">履歴</Link>
                            <Link href="/settings" className="hover:text-blue-600 transition">設定</Link>
                        </nav>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto px-6 py-12">{children}</main>

                <footer className="text-center text-gray-400 text-sm py-8">
                    © 2025 PlayRoute
                </footer>
            </body>
        </html>
    );
}
