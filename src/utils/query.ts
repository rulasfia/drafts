import { Octokit } from "@octokit/core";
import type { EntryResponse } from "../types";

let octoInstance: Octokit | null = null;

const octokit = (token: string) => {
	if (octoInstance) return octoInstance;
	octoInstance = new Octokit({ auth: token });

	return octoInstance;
};

export async function getAllContent(token: string) {
	const response = await octokit(token).request(
		"GET /repos/rulasfia/notes.md/contents/Works",
		{
			owner: "rulasfia",
			repo: "notes.md",
			path: "Works",
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
				accept: "application/vnd.github.v3.object",
			},
		}
	);

	return response.data as EntryResponse & { entries: EntryResponse[] };
}

export async function getContent(token: string, path: string) {
	const response = await octokit(token).request(
		`GET /repos/rulasfia/notes.md/contents/${path}`,
		{
			owner: "rulasfia",
			repo: "notes.md",
			path: path,
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
				accept: "application/vnd.github.v3.object",
			},
		}
	);

	return response.data as EntryResponse & { entries: EntryResponse[] };
}
