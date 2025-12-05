import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "FR-NEXT_Fuwari",
	subtitle: "基于 Fuwari 的博客",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "赞助",
			url: "/sponsors/",
		},
		{
			name: "GitHub",
			url: "https://github.com/nczxe/fuwariT", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "https://tc.alcy.cc/q/20250908/ae1d123b9eae304dcdc75576155c0f54.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "FR-NEXT",
	bio: "一切都只是For the next step",
	links: [
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/422660019",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/nczxe/fuwariT",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

/**
 * Umami 分析配置
 * 详细配置指南：
 * 1. 注册或登录 Umami 账户：https://umami.is/
 * 2. 创建网站：在 Umami 仪表板中，点击 "Add Website" 添加你的网站
 * 3. 获取 websiteId：创建网站后，在网站设置中可以找到 websiteId
 * 4. 获取 shareId：在网站的 "Share" 选项卡中，创建或复制分享链接，其中包含 shareId
 * 5. 配置 baseUrl：
 *    - 如果你使用的是 Umami Cloud，baseUrl 为 "https://cloud.umami.is"
 *    - 如果你使用的是自托管 Umami，baseUrl 为你的 Umami 实例地址
 * 6. 配置 timezone：设置为你的网站主要受众所在的时区，例如 "Asia/Shanghai"
 */
export const umamiConfig = {
	enable: true, // 是否启用 Umami 分析
	baseUrl: "https://cloud.umami.is", // Umami 实例基础 URL
	websiteId: "f4f63c1e-4732-48c8-a838-b5f457a6af36", // 网站 ID
	shareId: "09xZoCGoHp4yD1yk", // 分享统计 ID
	timezone: "Asia/Shanghai", // 时区设置
};

export const statsConfig = {
	viewsText: "浏览",
	visitsText: "访客",
	loadingText: "统计加载中...",
	unavailableText:
		"统计不可用。请检查是否屏蔽了Umami域名，如AdGuard和AdBlock等插件",
	getStatsText: (pageViews: number, visits: number) =>
		`${statsConfig.viewsText} ${pageViews} · ${statsConfig.visitsText} ${visits}`,
};
