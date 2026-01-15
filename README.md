<p align="center">
    <img src="docs/assets/logo.svg" width="120">
</p>

# [Vue Resume Template](https://ryanbalieiro.github.io/vue-resume-template/) by Ryan Balieiro

A clean and minimal template for building a resume landing page, powered by **Vue 3** (Composition API) and **Bootstrap 5**.

![alt tag1](docs/assets/promo-1.png)

Key features:
- Uses Vue3 **Composition API**.
- **Six unique section layouts** to showcase your work experience, education, skills, projects, and more.
- Adaptive navigation: **a fixed sidebar** for desktops and **a tabbed layout** for mobile.
- Built-in **multi-language** support.
- Emails with **EmailJS** – no backend needed!
- **Super easy** to customize!

## Live Preview

Here's a list of live versions of the template:

| #     | Version                | Description                                              | URL                                                                  |
|-------|------------------------|----------------------------------------------------------|----------------------------------------------------------------------|
| 🟣    | Roy Sheppard (default) | Latest deployment of the template here on GitHub pages.  | [Preview](https://ryanbalieiro.github.io/vue-resume-template/)       |
| 🟢    | Alana Richard          | An example of how the template can be customized.        | [Preview](https://ryansandbox.github.io/alana-richard-vue-resume/)   |
| 🔵    | Gabriel Becker         | Another example of how the template can be customized.   | [Preview](https://ryansandbox.github.io/gabriel-becker-vue-resume/)  |

## Layout and concept

### 1. Base layout
The theme has a clean, minimalist design with a nice mix of purple shades that gives it a fresh, stylish vibe.

![alt tag1](docs/assets/promo-4.png)

### 2. Desktop Screenshots
On desktop, it has a simple one-page layout with a fixed sidebar, so users can easily scroll through the sections.

![alt tag1](docs/assets/promo-2.png)

### 3. Mobile Screenshots
On mobile, the layout groups the sections into categories and transforms into a tabbed interface with a bottom navigation.

![alt tag1](docs/assets/promo-3.png)

## Getting Started

1. Clone the repo:
```
git clone https://github.com/ryanbalieiro/vue-resume-template
```

2. Go to the project's root folder and use npm to install all required components:
```
npm install
```

3. Launch the project in developer mode:
```
npm run dev
```

4. (Optional) If you'd like to clear all the portfolio data and begin with a blank page with no sections, run the command below:
```
npm run resume:clear
```

5. (Optional) If you want to temporarily deactivate the preload animation during theme adjustments, go to `public/data/settings.json` and set the `preloaderEnabled` flag to false.

## Configuration Tutorial

Watch this step-by-step video tutorial to see exactly how to configure your resume:

| #   | Title                                    | Watch                                                                    |
|-----|------------------------------------------|--------------------------------------------------------------------------|
| 1   | Setting up the project                   | [Watch on YouTube](https://www.youtube.com/watch?v=QvQQK81xljw&t=0m00s)  |
| 2   | Title and colors                         | [Watch on YouTube](https://www.youtube.com/watch?v=QvQQK81xljw&t=1m31s)  |
| 3   | Settings, strings and profile            | [Watch on YouTube](https://www.youtube.com/watch?v=QvQQK81xljw&t=4m20s)  |
| 4   | Categories and sections                  | [Watch on YouTube](https://www.youtube.com/watch?v=QvQQK81xljw&t=7m37s)  |
| 5   | ArticleProfile                           | [Watch on YouTube](https://www.youtube.com/watch?v=QvQQK81xljw&t=10m33s) |
| 6   | ArticleTimeline                          | [Watch on YouTube](https://www.youtube.com/watch?v=QvQQK81xljw&t=14m12s) |
| 7   | ArticleSkills                            | [Watch on YouTube](https://www.youtube.com/watch?v=QvQQK81xljw&t=18m00s) |
| 8   | ArticlePortfolio                         | [Watch on YouTube](https://www.youtube.com/watch?v=QvQQK81xljw&t=22m38s) |
| 9   | ArticleThreads and ArticleContactOptions | [Watch on YouTube](https://www.youtube.com/watch?v=QvQQK81xljw&t=25m36s) |
| 10  | ArticleContactForm                       | [Watch on YouTube](https://www.youtube.com/watch?v=QvQQK81xljw&t=29m44s) |
| 11  | Deploying on GitHub Pages                | [Watch on YouTube](https://www.youtube.com/watch?v=QvQQK81xljw&t=34m05s) |
| 12  | Extra deployment instructions            | [Watch on YouTube](https://www.youtube.com/watch?v=QvQQK81xljw&t=36m20s) |

For step-by-step setup and deployment instructions, you can also check out the following docs:
- [CONFIGURATION.md](./docs/CONFIGURATION.md) – learn how to configure and customize the project.
- [DEPLOYMENT.md](./docs/DEPLOYMENT.md) – short guide on deploying the project.

## About

This template was created by and is maintained by **[Ryan Balieiro](https://ryanbalieiro.com/)**.

It is based on the [Bootstrap](https://getbootstrap.com/) framework created by Mark Otto and Jacob Thorton; and the [Vue](https://vuejs.org/) framework created by Evan You.

Additional frameworks and plugins used include:
- **Font Awesome**: A library of free vector icons.
- **EmailJS**: A free service that allows you to send emails using JavaScript.
- **PrimeIcons**: Another library of free vector icons.
- **ChartJS**: A free JavaScript library for creating charts and graphs.

## Copyright and License

Code released under the [MIT](https://opensource.org/license/mit) license, providing complete freedom for utilization. Feel free to enhance and adapt it to suit your needs.

Oh... and if you like this template, don't forget to **give it a ⭐** :)

实现动态主题切换系统
支持深色/浅色/模式，主题选择需持久化到localStorage，并在页面加载时应用。要求：切换时需有过渡动画效果，且不影响SVG技能进度条的颜色计算逻辑。
2轮交互修复[plugin:vite:vue] Element is missing end tag.
错误是因为在 template 中添加了 div.app-container 元素但忘记添加对应的结束标签

3轮交互报错 TypeError: $setup.localizeStrings is not a function
在 NavSidebar.vue 中错误地使用了不存在的 localizeStrings 函数，正确的函数名应为 localizeFromStrings （已在 LanguageManager.vue 中提供）。
1. 将按钮的 :title 属性从 localizeStrings('toggle_theme') 改为 localizeFromStrings('toggle_theme')
2. 将注入的函数名从 localizeStrings 改为 localizeFromStrings

最终 点击主题按钮没有效果，功能未完成