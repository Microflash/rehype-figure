import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { expect, it } from "vitest";
import rehypeFigure from "../index.js";
import scenarios from "./fixtures.js";

const scenario = scenarios.map(s => s.title);

async function parse(markdown, options = {}) {
	const file = await unified()
		.use(remarkParse)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeFigure, options)
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(markdown);

	return String(file);
}

const currentDirectory = process.cwd();
const testDirectory = "test";
const snapshotsDirectory = "snapshots";

it.each(scenario)(`Test: %s`, async (rule) => {
	const { input, options = {} } = scenarios.find(s => s.title === rule);
	const result = await parse(input, options);
	const snapshot = path.resolve(
		currentDirectory,
		testDirectory,
		snapshotsDirectory,
		`${rule.replaceAll(" ", "_")}.html`
	);
	await expect(result).toMatchFileSnapshot(snapshot);
});
