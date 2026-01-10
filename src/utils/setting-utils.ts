import {
	AUTO_MODE,
	DARK_MODE,
	DEFAULT_THEME,
	LIGHT_MODE,
} from "@constants/constants.ts";
import { expressiveCodeConfig } from "@/config";
import type { LIGHT_DARK_MODE } from "@/types/config";

// 默认背景透明度 - 调整为100%
const DEFAULT_BACKGROUND_OPACITY = 1.0;

// Cookie偏好类型
export type CookiePreference = {
	necessary: boolean;
	preferences: boolean;
	statistics: boolean;
	marketing: boolean;
};

// 从cookie中获取值
export function getCookie(name: string): string | null {
	const nameEQ = `${name}=`;
	const ca = document.cookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === " ") c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

// 设置cookie
export function setCookie(name: string, value: string, days = 365): void {
	// 检查是否允许设置cookie
	if (!isCookieAllowed("preferences")) {
		return;
	}
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = `expires=${date.toUTCString()}`;
	document.cookie = `${name}=${value};${expires};path=/`;
}

// 删除cookie
export function deleteCookie(name: string): void {
	document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// 获取cookie偏好
export function getCookiePreference(): CookiePreference {
	const cookie = getCookie("cookiePreference");
	if (cookie) {
		try {
			return JSON.parse(decodeURIComponent(cookie));
		} catch (_e) {
			return {
				necessary: true,
				preferences: false,
				statistics: false,
				marketing: false,
			};
		}
	}
	return {
		necessary: true,
		preferences: false,
		statistics: false,
		marketing: false,
	};
}

// 设置cookie偏好
export function setCookiePreference(
	preference: CookiePreference,
	isRejectAll = false,
): void {
	const cookieValue = encodeURIComponent(JSON.stringify(preference));
	const expires = new Date();
	if (isRejectAll) {
		// 如果拒绝所有cookie，设置一个过期的cookie
		expires.setTime(expires.getTime() - 1);
	} else {
		// 否则设置一个长期有效的cookie
		expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
	}
	document.cookie = `cookiePreference=${cookieValue};expires=${expires.toUTCString()};path=/`;

	// 触发自定义事件，通知其他组件cookie偏好已更改
	document.dispatchEvent(
		new CustomEvent("cookiePreferenceChanged", { detail: preference }),
	);

	// 如果拒绝所有cookie，清除所有非必要cookie
	if (isRejectAll) {
		clearNonNecessaryCookies();
	}
}

// 检查是否允许使用特定类型的cookie
export function isCookieAllowed(type: keyof CookiePreference): boolean {
	const preference = getCookiePreference();
	// 必要cookie总是允许的
	if (type === "necessary") {
		return true;
	}
	return preference[type] || false;
}

// 检查是否已经有cookie偏好设置
export function hasCookiePreference(): boolean {
	return getCookie("cookiePreference") !== null;
}

// 清除所有非必要cookie
export function clearNonNecessaryCookies(): void {
	const cookies = document.cookie.split(";");
	for (const cookie of cookies) {
		const cookieName = cookie.trim().split("=")[0];
		// 保留cookiePreference本身，用于记住用户的选择
		if (cookieName !== "cookiePreference") {
			deleteCookie(cookieName);
		}
	}
}

export function getDefaultHue(): number {
	const fallback = "250";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback, 10);
}

export function getHue(): number {
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored, 10) : getDefaultHue();
}

export function setHue(hue: number): void {
	localStorage.setItem("hue", String(hue));
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(hue));
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE): void {
	switch (theme) {
		case LIGHT_MODE:
			document.documentElement.classList.remove("dark");
			break;
		case DARK_MODE:
			document.documentElement.classList.add("dark");
			break;
		case AUTO_MODE:
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			break;
	}

	// Set the theme for Expressive Code
	document.documentElement.setAttribute(
		"data-theme",
		expressiveCodeConfig.theme,
	);

	// 更新卡片背景透明度
	const opacity = getCardOpacity();
	const root = document.querySelector(":root") as HTMLElement;
	if (root) {
		// 获取当前主题模式
		const isDarkMode = document.documentElement.classList.contains("dark");
		// 设置卡片背景透明度
		if (isDarkMode) {
			root.style.setProperty("--card-bg", `rgba(37, 37, 42, ${opacity})`);
		} else {
			root.style.setProperty("--card-bg", `rgba(255, 255, 255, ${opacity})`);
		}
	}
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
	localStorage.setItem("theme", theme);
	applyThemeToDocument(theme);
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	return (localStorage.getItem("theme") as LIGHT_DARK_MODE) || DEFAULT_THEME;
}

// 背景透明度相关函数
export function getBackgroundOpacity(): number {
	const stored = getCookie("backgroundOpacity");
	return stored ? Number.parseFloat(stored) : DEFAULT_BACKGROUND_OPACITY;
}

export function setBackgroundOpacity(opacity: number): void {
	setCookie("backgroundOpacity", String(opacity));
	const backgroundImage = document.getElementById("background-image");
	if (backgroundImage) {
		backgroundImage.style.opacity = String(opacity);
	}
}

// 卡片背景透明度相关函数
const DEFAULT_CARD_OPACITY = 0.3;

export function getCardOpacity(): number {
	const stored = getCookie("cardOpacity");
	return stored ? Number.parseFloat(stored) : DEFAULT_CARD_OPACITY;
}

export function setCardOpacity(opacity: number): void {
	setCookie("cardOpacity", String(opacity));
	const root = document.querySelector(":root") as HTMLElement;
	if (!root) {
		return;
	}
	// 获取当前主题模式
	const isDarkMode = document.documentElement.classList.contains("dark");
	// 设置卡片背景透明度
	if (isDarkMode) {
		root.style.setProperty("--card-bg", `rgba(37, 37, 42, ${opacity})`);
	} else {
		root.style.setProperty("--card-bg", `rgba(255, 255, 255, ${opacity})`);
	}
}
