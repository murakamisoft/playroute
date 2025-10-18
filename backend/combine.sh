#!/bin/bash

# === 出力ファイル名 ===
outputFile="combined.txt"

# === 対象拡張子 ===
extensions=("java" "sql" "xml" "yaml" "gradle" "a5er" "jmx")

# === 対象外フォルダ ===
excludeDirs=("build" "out" ".gradle")  # 除外したいフォルダ名を追加

# === 出力ファイル初期化 ===
echo "以下が最新のソース一覧ですので共有します" > "$outputFile"

# === 各拡張子のファイルを再帰的に処理 ===
for ext in "${extensions[@]}"; do
    # find用の除外パスオプションを作成
    excludeParams=()
    for dir in "${excludeDirs[@]}"; do
        excludeParams+=(-not -path "*/${dir}/*")
    done

    while IFS= read -r -d '' file; do
        echo "[追加中] $file"
        {
            echo
            echo "===== $file ====="
            cat "$file"
            echo
        } >> "$outputFile"
    done < <(find . -type f -name "*.${ext}" "${excludeParams[@]}" -print0)
done

echo "完了: $outputFile に全ファイルを結合しました"
