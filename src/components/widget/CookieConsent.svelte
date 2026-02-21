<script lang="ts" context="module">
// Cookie偏好类型
export type CookiePreference = {
	necessary: boolean;
	preferences: boolean;
	statistics: boolean;
	marketing: boolean;
};
</script>

<script lang="ts">
import Icon from "@iconify/svelte";

// 默认cookie偏好
const defaultCookiePreference: CookiePreference = {
	necessary: true,
	preferences: false,
	statistics: false,
	marketing: false,
};

// 获取当前cookie偏好
function getCookiePreference(): CookiePreference {
	const stored = localStorage.getItem("cookiePreference");
	if (stored) {
		try {
			return JSON.parse(stored);
		} catch (e) {
			return defaultCookiePreference;
		}
	}
	return defaultCookiePreference;
}

// 设置cookie偏好
function setCookiePreference(
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
}

// 检查是否已经有cookie偏好设置
function hasCookiePreference(): boolean {
	return localStorage.getItem("cookiePreference") !== null;
}

// 组件状态
let isVisible = !hasCookiePreference();
let isOpen = false;
let cookiePreference = getCookiePreference();

// 延迟显示弹窗，实现从下方流畅弹出的效果
setTimeout(() => {
	if (isVisible) {
		isOpen = true;
	}
}, 500);

// 接受所有cookie
function acceptAll() {
	const allAccepted: CookiePreference = {
		necessary: true,
		preferences: true,
		statistics: true,
		marketing: true,
	};
	setCookiePreference(allAccepted);
	isOpen = false;
	isVisible = false;
}

// 仅接受必要cookie
function acceptNecessary() {
	const necessaryOnly: CookiePreference = {
		necessary: true,
		preferences: false,
		statistics: false,
		marketing: false,
	};
	setCookiePreference(necessaryOnly);
	isOpen = false;
	isVisible = false;
}

// 拒绝所有cookie
function rejectAll() {
	setCookiePreference(defaultCookiePreference, true);
	isOpen = false;
	isVisible = false;
}

// 保存自定义设置
function saveCustomSettings() {
	setCookiePreference(cookiePreference);
	isOpen = false;
	isVisible = false;
}

// 切换弹窗显示状态
export function toggleCookieConsent() {
	isVisible = true;
	isOpen = true;
}

// 监听cookie偏好更改事件
document.addEventListener("cookiePreferenceChanged", (event) => {
	cookiePreference = (event as CustomEvent<CookiePreference>).detail;
});

// 监听切换cookie许可弹窗事件
document.addEventListener("toggleCookieConsent", () => {
	toggleCookieConsent();
});
</script>

{#if isVisible}
<div class="fixed bottom-4 left-4 z-50 pointer-events-none">
  <!-- 移动端简化版本 -->
  <div 
    class="max-w-xs w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 md:hidden transition-all duration-500 ease-in-out pointer-events-auto"
    class:open={isOpen}
    style:transform={isOpen ? 'translate(0, 0)' : 'translate(-100%, 100%)'}
    style:opacity={isOpen ? '1' : '0'}
  >
    <div class="flex flex-col gap-4">
      <div>
        <h3 class="text-lg font-bold mb-2 flex items-center gap-2">
          <Icon icon="fa6-solid:cookie" class="text-[var(--primary)]" />
          Cookie 许可
        </h3>
        <p class="text-sm">
          我们使用cookie来提升您的浏览体验。
        </p>
      </div>
      
      <!-- 移动端简化操作按钮 -->
      <div class="flex flex-col gap-2">
        <button 
          on:click={rejectAll}
          class="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          拒绝
        </button>
        <button 
          on:click={acceptNecessary}
          class="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          仅必要
        </button>
        <button 
          on:click={acceptAll}
          class="w-full px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary)]/90 transition-colors"
        >
          全部接受
        </button>
      </div>
    </div>
  </div>
  
  <!-- 桌面端完整版本 -->
  <div 
    class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 hidden md:block transition-all duration-500 ease-in-out pointer-events-auto"
    class:open={isOpen}
    style:transform={isOpen ? 'translate(0, 0)' : 'translate(-100%, 100%)'}
    style:opacity={isOpen ? '1' : '0'}
  >
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="flex-1">
        <h3 class="text-xl font-bold mb-2 flex items-center gap-2">
          <Icon icon="fa6-solid:cookie" class="text-[var(--primary)]" />
          Cookie 许可
        </h3>
        <p class="text-sm mb-4">
          我们使用cookie来提升您的浏览体验。您可以选择允许或拒绝使用不同类型的cookie。
        </p>
        
        <!-- 自定义cookie设置 -->
        <div class="space-y-3 mb-4">
          <div class="flex items-center justify-between">
            <label for="necessary-cookie" class="font-medium">必要cookie</label>
            <input 
              id="necessary-cookie"
              type="checkbox" 
              bind:checked={cookiePreference.necessary} 
              disabled
              class="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
            />
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            这些cookie对于网站的基本功能是必要的，无法禁用。
          </p>
          
          <div class="flex items-center justify-between">
            <label for="preferences-cookie" class="font-medium">偏好设置cookie</label>
            <input 
              id="preferences-cookie"
              type="checkbox" 
              bind:checked={cookiePreference.preferences}
              class="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
            />
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            这些cookie用于记住您的偏好设置，例如主题、语言等。
          </p>
          
          <div class="flex items-center justify-between">
            <label for="statistics-cookie" class="font-medium">统计分析cookie</label>
            <input 
              id="statistics-cookie"
              type="checkbox" 
              bind:checked={cookiePreference.statistics}
              class="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
            />
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            这些cookie用于收集网站使用情况的统计数据，帮助我们改进网站。
          </p>
          
          <div class="flex items-center justify-between">
            <label for="marketing-cookie" class="font-medium">营销推广cookie</label>
            <input 
              id="marketing-cookie"
              type="checkbox" 
              bind:checked={cookiePreference.marketing}
              class="w-4 h-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
            />
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            这些cookie用于向您展示相关的广告内容。
          </p>
        </div>
      </div>
    </div>
    
    <!-- 操作按钮 -->
    <div class="flex flex-wrap gap-2 justify-between mt-6">
      <button 
        on:click={rejectAll}
        class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        拒绝所有
      </button>
      <button 
        on:click={acceptNecessary}
        class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        仅必要
      </button>
      <button 
        on:click={saveCustomSettings}
        class="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary)]/90 transition-colors"
      >
        保存设置
      </button>
      <button 
        on:click={acceptAll}
        class="px-4 py-2 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary)]/90 transition-colors"
      >
        接受所有
      </button>
    </div>
  </div>
</div>
{/if}

<style scoped>
  .open {
    transform: translateY(0) !important;
    opacity: 1 !important;
  }
</style>