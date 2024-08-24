<script lang="ts">
	import { fly } from "svelte/transition";

	export let path: string;
	export let status: "private" | "public";

	$: isUpdating = false;
	$: localStatus = status;

	async function changeContentStatusHandler() {
		isUpdating = true;
		const key = new URLSearchParams(window.location.search).get("pass");
		if (!key) return;

		const payload = new FormData();
		payload.set("path", path);

		const res = await fetch(`/api/content`, {
			method: "POST",
			headers: { Authorization: key },
			body: payload,
		});

		localStatus = localStatus === "private" ? "public" : "private";
		isUpdating = false;
	}
</script>

<button
	type="button"
	on:click={changeContentStatusHandler}
	data-status={localStatus}
	class="bg-gradient-to-b font-semibold text-sm px-8 h-8 w-full max-w-32 inline-flex justify-center items-center rounded-lg ring-1 hover:ring-2 shadow hover:shadow-md transition-all duration-150 ease-out dark:text-neutral-800 data-[status=private]:from-orange-100 data-[status=private]:to-orange-300 data-[status=private]:dark:from-orange-300 data-[status=private]:dark:to-orange-600 data-[status=private]:ring-orange-200 data-[status=private]:dark:ring-orange-500 data-[status=private]:shadow-orange-400/50 data-[status=public]:from-zinc-100 data-[status=public]:to-zinc-300 data-[status=public]:dark:from-zinc-300 data-[status=public]:dark:to-zinc-600 data-[status=public]:dark:ring-zinc-500 data-[status=public]:ring-zinc-200 data-[status=public]:shadow-zinc-400/50"
>
	<!-- {status === "private" ? "Publish" : "Unpublish"} -->
	{#if isUpdating}
		<span in:fly={{ y: 20, duration: 200 }}>...</span>
	{:else if localStatus === "private"}
		<span in:fly={{ y: 20, duration: 200 }}>Publish</span>
	{:else}
		<span in:fly={{ y: 20, duration: 200 }}>Unpublish</span>
	{/if}
</button>
