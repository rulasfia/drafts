export function formatSlug(str: string) {
	return str
		.toLowerCase()
		.replace(".md", "")
		.replace(/ /g, "-")
		.replace(/[^a-z0-9-]/g, "");
}

export function parseImages(body: string) {
	const startChar = "!\\[\\["; // Escape the ![[ characters
	const endChar = "\\]\\]"; // Escape the ]] characters

	const regex = new RegExp(`${startChar}(.*?)${endChar}`, "g");
	const matches = body.match(regex)?.map((m) => m.slice(3, -2)) ?? [];

	return { matches, regex };
}

export function parseInternalLink(body: string) {
	const startChar = "\\[\\["; // Escape the ![[ characters
	const endChar = "\\]\\]"; // Escape the ]] characters

	const regex = new RegExp(`${startChar}(.*?)${endChar}`, "g");
	const matches = body.match(regex)?.map((m) => m.slice(2, -2)) ?? [];

	return { matches, regex };
}
