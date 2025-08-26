---
title: "Bootstrap Blogテーマを始めよう"
slug: "getting-started"
date: 2024-01-15T10:00:00Z
description: "Hugo用Bootstrap Blogテーマの使い方を学ぼう"
categories: ["チュートリアル"]
tags: ["Hugo", "Bootstrap", "はじめに"]
image: "/images/getting-started.jpg"
toc: true
author: "John Doe"
---

## はじめに

Hugo用Bootstrap Blogテーマへようこそ！このテーマは、Bootstrap 5.3を使用したクリーンでモダンな、完全にレスポンシブなブログデザインを提供します。

## 特徴

### レスポンシブデザイン

テーマは完全にレスポンシブで、モバイルからデスクトップまですべてのデバイスで美しく表示されます。

### ダークモード対応

ワンクリックでライトモードとダークモードを切り替えられます。システム設定も自動的に反映されます。

### モジュラーサイドバー

様々なモジュールでサイドバーをカスタマイズ：
- 検索機能
- カテゴリーとタグ
- 最近の投稿
- アーカイブ
- 著者プロフィール
- その他多数！

## インストール

### ステップ1: Hugoをインストール

まず、Hugoがインストールされていることを確認してください。Hugo 0.120.0以降が必要です。

```bash
brew install hugo
```

### ステップ2: 新しいサイトを作成

```bash
hugo new site my-blog
cd my-blog
```

### ステップ3: テーマをインストール

Gitサブモジュールとしてテーマをインストール：

```bash
git init
git submodule add https://github.com/ngs/hugo-bootstrap-blog themes/hugo-bootstrap-blog
```

またはHugo Modulesを使用：

```bash
hugo mod init github.com/yourusername/my-blog
hugo mod get github.com/ngs/hugo-bootstrap-blog
```

### ステップ4: サイトを設定

テーマから設定例をコピー：

```bash
cp themes/hugo-bootstrap-blog/exampleSite/hugo.toml .
```

## 設定

### 基本設定

`hugo.toml`ファイルを編集してサイトをカスタマイズ：

```toml
baseURL = "https://yourdomain.com/"
title = "私の素晴らしいブログ"
theme = "hugo-bootstrap-blog"
```

### サイドバーモジュール

サイドバーに表示するモジュールを設定：

```toml
[params]
  sidebarModules = ["search", "categories", "tags", "recent", "archives"]
```

## コンテンツの作成

最初のブログ記事を作成：

```bash
hugo new posts/my-first-post.md
```

## まとめ

これでBootstrap Blogテーマでブログを始める準備ができました！設定オプションを探索して、お好みに合わせてテーマをカスタマイズしてください。
