import { findAndReplace } from "mdast-util-find-and-replace";

export function remarkImages() {
	const imgRegex = /!\[\[(.*?)\]\]/g;
	return (tree, _file) => {
		findAndReplace(tree, [[imgRegex, replaceImg]]);
	};

	/**
	 * @type {import("mdast-util-find-and-replace").ReplaceFunction}
	 * @param {string} value
	 * @param {string} username
	 */
	function replaceImg(value, username) {
		let val = { alt: username.split("/").pop(), url: `./${username}` };

		console.log(val);

		return [
			{
				type: "image",
				url: val.url,
				alt: val.alt,
			},
		];
	}
}

export function remarkLinks() {
	const linkRegex = /(?<!!)\[\[(.*?)\]\]/g;
	return (tree, _file) => {
		findAndReplace(tree, [[linkRegex, replaceLink]]);
	};

	/**
	 * @type {import("mdast-util-find-and-replace").ReplaceFunction}
	 * @param {string} _
	 * @param {string} text
	 */
	function replaceLink(_, text) {
		let val = { value: text, url: formatSlug(text) };

		if (
			text.includes(".png") ||
			text.includes(".jpg") ||
			text.includes(".jpeg")
		) {
			return;
		}

		console.log(val);

		if (text.startsWith("#")) {
			val.value = text.slice(1);
			val.url = `#${formatSlug(text)}`;
		}

		return [
			{
				type: "link",
				url: val.url,
				children: [{ type: "text", value: val.value }],
			},
		];
	}
}

function formatSlug(str) {
	return str
		.toLowerCase()
		.replace(".md", "")
		.replace(/ /g, "-")
		.replace(/[^a-z0-9-]/g, "");
}
