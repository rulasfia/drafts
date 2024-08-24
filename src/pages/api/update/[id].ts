import type { APIRoute } from "astro";
import { drizzle } from "drizzle-orm/d1";
import { contents } from "../../../schema";
import { eq } from "drizzle-orm";
import { getContent } from "../../../utils/query";

export const GET: APIRoute = async ({ locals, params, request }) => {
	try {
		const { id } = params;

		// check auth
		const auth = request.headers.get("Authorization");
		if (auth !== locals.runtime.env.SECRET) {
			return new Response(JSON.stringify({ msg: "unauthorized" }), {
				status: 401,
			});
		}

		// make sure the id is available
		if (!id) {
			return new Response(JSON.stringify({ msg: "invalid id" }), {
				status: 400,
			});
		}

		const res = await drizzle(locals.runtime.env.DB)
			.select({ id: contents.id, path: contents.path })
			.from(contents)
			.where(eq(contents.id, Number(id)))
			.limit(1);

		if (!res || res.length < 1) {
			return new Response(JSON.stringify({ msg: "content unavailable" }), {
				status: 400,
			});
		}

		// update content
		// 1. get content from gh api
		const updated = await getContent(
			locals.runtime.env.GITHUB_PAT,
			encodeURI(res[0].path)
		);
		const updatedRaw = await fetch(updated.download_url).then((r) => r.text());

		// 2. push new content to db
		await drizzle(locals.runtime.env.DB)
			.update(contents)
			.set({ body: updatedRaw })
			.where(eq(contents.id, Number(id)));

		return new Response(JSON.stringify({ msg: "content updated" }));
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ msg: "something went wrong" }), {
			status: 500,
		});
	}
};
