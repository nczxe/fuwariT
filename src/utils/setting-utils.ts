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

// 从localStorage中获取值
export function getStorageValue(name: string): string | null {
	return localStorage.getItem(name);
}

// 存储值到localStorage
export function setStorageValue(name: string, value: string): void {
	// 检查是否允许设置偏好
	if (!isCookieAllowed("preferences")) {
		return;
	}
	localStorage.setItem(name, value);
}

// 从localStorage中删除值
export function removeStorageValue(name: string): void {
	localStorage.removeItem(name);
}

// 获取cookie偏好
export function getCookiePreference(): CookiePreference {
	const stored = localStorage.getItem("cookiePreference");
	if (stored) {
		try {
			return JSON.parse(stored);
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
	if (isRejectAll) {
		// 如果拒绝所有cookie，移除存储的偏好
		localStorage.removeItem("cookiePreference");
	} else {
		// 否则存储偏好到localStorage
		localStorage.setItem("cookiePreference", JSON.stringify(preference));
	}

	// 触发自定义事件，通知其他组件cookie偏好已更改
	document.dispatchEvent(
		new CustomEvent("cookiePreferenceChanged", { detail: preference }),
	);

	// 如果拒绝所有cookie，清除所有非必要存储
	if (isRejectAll) {
		clearNonNecessaryStorage();
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
	return localStorage.getItem("cookiePreference") !== null;
}

// 清除所有非必要存储
export function clearNonNecessaryStorage(): void {
	const keysToKeep = ["cookiePreference", "theme", "hue"];
	const keys = Object.keys(localStorage);
	
	keys.forEach(key => {
		if (!keysToKeep.includes(key)) {
			localStorage.removeItem(key);
		}
	});
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
	const stored = getStorageValue("backgroundOpacity");
	return stored ? Number.parseFloat(stored) : DEFAULT_BACKGROUND_OPACITY;
}

export function setBackgroundOpacity(opacity: number): void {
	setStorageValue("backgroundOpacity", String(opacity));
	const backgroundImage = document.getElementById("background-image");
	if (backgroundImage) {
		backgroundImage.style.opacity = String(opacity);
	}
}

// 卡片背景透明度相关函数
const DEFAULT_CARD_OPACITY = 0.3;

export function getCardOpacity(): number {
	const stored = getStorageValue("cardOpacity");
	return stored ? Number.parseFloat(stored) : DEFAULT_CARD_OPACITY;
}

export function setCardOpacity(opacity: number): void {
	setStorageValue("cardOpacity", String(opacity));
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
