<script lang="ts">
import Icon from "@iconify/svelte";

// 调研链接
const surveyLink = "https://ccn9df4ga1nj.feishu.cn/share/base/form/shrcnVPX1hGGxNQ8IBiKw9dg1qf";

// 存储键名
const STORAGE_KEY = "surveyNoticeStatus";

// 状态类型
type SurveyStatus = "accepted" | "rejected" | "completed" | null;

// 获取存储的状态
function getSurveyStatus(): SurveyStatus {
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored as SurveyStatus || null;
}

// 存储状态
function setSurveyStatus(status: SurveyStatus): void {
	localStorage.setItem(STORAGE_KEY, status || "");
}

// 组件状态
let isVisible = getSurveyStatus() === null;
let isOpen = false;

// 延迟显示弹窗，实现平滑弹出效果
setTimeout(() => {
	if (isVisible) {
		isOpen = true;
	}
}, 1000);

// 接受调研
function acceptSurvey() {
	// 跳转到调研链接
	window.open(surveyLink, "_blank");
	// 存储状态
	setSurveyStatus("accepted");
	// 关闭弹窗
	isOpen = false;
	isVisible = false;
}

// 拒绝调研
function rejectSurvey() {
	// 存储状态
	setSurveyStatus("rejected");
	// 关闭弹窗
	isOpen = false;
	isVisible = false;
}

// 已经接受过调研
function completedSurvey() {
	// 存储状态
	setSurveyStatus("completed");
	// 关闭弹窗
	isOpen = false;
	isVisible = false;
}

// 关闭弹窗
function closeNotice() {
	// 暂时关闭弹窗，不存储状态
	isOpen = false;
	isVisible = false;
}

// 稍后参加调研
function laterSurvey() {
	// 暂时关闭弹窗，不存储状态
	isOpen = false;
	isVisible = false;
}

// 切换弹窗显示状态（用于从菜单中触发）
export function toggleSurveyNotice() {
	isVisible = true;
	isOpen = true;
}

// 监听切换公告弹窗事件
document.addEventListener("toggleSurveyNotice", () => {
	toggleSurveyNotice();
});
</script>

{#if isVisible}
<div class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center pointer-events-auto">
	<div 
		class="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 transition-all duration-500 ease-in-out transform scale-95 opacity-0"
		class:open={isOpen}
	>
		<div class="flex items-start justify-between mb-4">
			<h3 class="text-lg font-bold text-neutral-900 dark:text-neutral-100">
				不好意思，我们需要您的帮助，请帮我们完成这个调研
			</h3>
			<button 
				on:click={closeNotice}
				class="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors"
			>
				<Icon icon="material-symbols:close" class="w-6 h-6" />
			</button>
		</div>
		
		<div class="mb-6">
			<p class="text-neutral-600 dark:text-neutral-400">
				我们正在进行一项关于博客使用体验的调研，您的反馈对我们非常重要。
				完成调研大约需要5分钟时间，感谢您的支持！
			</p>
		</div>
		
		<div class="flex flex-col gap-3">
			<button 
				on:click={acceptSurvey}
				class="w-full px-4 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary)]/90 transition-colors font-medium"
			>
				我愿意接受本次调研
			</button>
			<button 
				on:click={rejectSurvey}
				class="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
			>
				我不愿意接受本次调研
			</button>
			<button 
				on:click={laterSurvey}
				class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
			>
				稍后参加调研
			</button>
			<button 
				on:click={completedSurvey}
				class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-neutral-600 dark:text-neutral-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
			>
				我已经接受过调研了
			</button>
		</div>
	</div>
</div>
{/if}

<style scoped>
	.open {
		transform: scale(1) !important;
		opacity: 1 !important;
	}
</style>
