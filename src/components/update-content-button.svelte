<script lang="ts">
	export let id: number | null;
	export let status: "private" | "public";

	$: isUpdating = false;

	async function updateContentHandler() {
		isUpdating = true;
		const key = new URLSearchParams(window.location.search).get("pass");
		if (!key) return;

		const res = await fetch(`/api/update/${id}`, {
			method: "GET",
			headers: { Authorization: key },
		});

		console.log(res);
		isUpdating = false;
	}
</script>

<button
	on:click={updateContentHandler}
	name={`update-content-${id}`}
	disabled={status === "private" || isUpdating}
	type="button"
	class="bg-gradient-to-b from-zinc-100 to-zinc-300 font-semibold text-sm px-8 h-8 w-full max-w-32 inline-flex justify-center items-center rounded-lg ring-1 hover:ring-2 ring-zinc-200 shadow hover:shadow-md transition-all duration-150 ease-out dark:text-neutral-800 dark:from-zinc-300 dark:to-zinc-500 dark:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
>
	{isUpdating ? "..." : "Update"}
</button>
