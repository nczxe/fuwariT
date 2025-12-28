<script lang="ts">
import { Icon } from "astro-icon/components";
import { sourcesConfig } from "../config";

let isOpen = false;
let currentSource = sourcesConfig.defaultSource;

// 从配置中获取所有源
const sources = Object.entries(sourcesConfig.sources);

// 切换源
function switchSource(sourceKey: string) {
	const source = sourcesConfig.sources[sourceKey];
	if (source) {
		// 获取当前路径和查询参数
		const currentPath = window.location.pathname;
		const currentSearch = window.location.search;

		// 构建新的 URL
		const newUrl = new URL(currentPath + currentSearch, source.url);

		// 跳转到新的 URL
		window.location.href = newUrl.toString();
	}
	isOpen = false;
}

// 切换菜单的打开/关闭状态
function toggleMenu() {
	isOpen = !isOpen;
}

// 点击外部关闭菜单
function handleClickOutside(event: MouseEvent) {
	const dropdown = document.getElementById("source-switch-dropdown");
	const button = document.getElementById("source-switch-button");
	if (
		dropdown &&
		button &&
		!dropdown.contains(event.target as Node) &&
		!button.contains(event.target as Node)
	) {
		isOpen = false;
	}
}

// 添加点击外部关闭菜单的事件监听
document.addEventListener("click", handleClickOutside);
</script>

<div class="relative">
  <button
    id="source-switch-button"
    aria-label="切换源"
    class="btn-plain scale-animation rounded-lg w-11 h-11 active:scale-90"
    on:click={toggleMenu}
  >
    <Icon name="material-symbols:cloud-outline-rounded" class="text-[1.25rem]" />
  </button>

  <div
    id="source-switch-dropdown"
    class:list={[
      "absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-[var(--card-bg)] ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200",
      isOpen ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-95"
    ]}
  >
    <div class="py-1">
      {#each sources as [key, source]}
        <a
          href="#"
          class:list={[
            "block px-4 py-2 text-sm text-left w-full",
            "hover:bg-[var(--hover-bg)]",
            key === currentSource ? "text-[var(--primary)] font-medium" : "text-[var(--text-main)]"
          ]}
          on:click={() => switchSource(key)}
        >
          {source.name}
        </a>
      {/each}
    </div>
  </div>
</div>

<style scoped>
  /* 可以在这里添加自定义样式 */
</style>