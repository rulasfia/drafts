import type { APIRoute } from "astro";
import { drizzle } from "drizzle-orm/d1";
import { contents } from "../../schema";
import { eq } from "drizzle-orm";
import { getContent } from "../../utils/query";
import { formatSlug } from "../../utils/formatString";

export const POST: APIRoute = async ({ request, locals }) => {
	const data = await request.formData();
	const path = data.get("path");
	const status = data.get("status");

	// Validate the data - you'll probably want to do more than this
	if (!path || !status) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/manage?error=missing-fields",
			},
		});
	}

	// search if content exist
	const res = await drizzle(locals.runtime.env.DB)
		.select()
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
				status: status.toString(),
				body: body,
			});
	} else {
		// update status if exist
		await drizzle(locals.runtime.env.DB)
			.update(contents)
			.set({ status: status.toString() })
			.where(eq(contents.path, path.toString()));
	}

	// redirect back to manage page
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/manage",
		},
	});
};
