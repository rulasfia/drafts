import type { APIRoute } from "astro";
import { drizzle } from "drizzle-orm/d1";
import { contents } from "../../schema";
import { eq } from "drizzle-orm";
import { getContent } from "../../utils/query";
import { formatSlug } from "../../utils/formatString";

export const POST: APIRoute = async ({ request, locals }) => {
	try {
		// check auth
		const auth = request.headers.get("Authorization");
		if (auth !== locals.runtime.env.SECRET) {
			return new Response(JSON.stringify({ msg: "unauthorized" }), {
				status: 401,
			});
		}

		const data = await request.formData();
		const path = data.get("path");

		console.log({ data });
		// Validate the data - you'll probably want to do more than this
		if (!path) {
			return new Response(JSON.stringify({ msg: "invalid params" }), {
				status: 400,
			});
		}

		// search if content exist
		const res = await drizzle(locals.runtime.env.DB)
			.select({ id: contents.id, status: contents.status })
			.from(contents)
			.where(eq(contents.path, path.toString()));

		if (res.length === 0) {
			// create if not exist
			const str = encodeURI(path.toString());
			const values = await getContent(locals.runtime.env.GITHUB_PAT, str);
			const raw = await fetch(values.download_url);
			const body = await raw.text();

			await drizzle(locals.runtime.env.DB)
				.insert(contents)
				.values({
					title: values.name,
					slug: formatSlug(values.name),
					path: values.path,
					rawLink: values.download_url,
					status: "public",
					body: body,
				});
		} else {
			// update status if exist
			await drizzle(locals.runtime.env.DB)
				.update(contents)
				.set({ status: res[0].status === "public" ? "private" : "public" })
				.where(eq(contents.path, path.toString()));
		}

		// redirect back to manage page
		return new Response(JSON.stringify({ msg: "content published" }));
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ msg: "something went wrong" }), {
			status: 500,
		});
	}
};
