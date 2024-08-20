export function formatSlug(str: string) {
	return str
		.toLowerCase()
		.replace(".md", "")
		.replace(/ /g, "-")
		.replace(/[^a-z0-9-]/g, "");
}
