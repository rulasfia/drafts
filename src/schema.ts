import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contents = sqliteTable("contents", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	slug: text("slug").notNull(),
	body: text("body").notNull(),
	rawLink: text("raw_link").notNull(),
	path: text("path").notNull(),
	status: text("status").notNull(),
	created: integer("created", { mode: "timestamp_ms" })
		.notNull()
		.$defaultFn(() => new Date()),
});

export const attachments = sqliteTable("attachments", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	url: text("url").notNull(),
	name: text("name").notNull(),
	created: integer("created", { mode: "timestamp_ms" })
		.notNull()
		.$defaultFn(() => new Date()),
	contentId: integer("content_id")
		.notNull()
		.references(() => contents.id),
});
