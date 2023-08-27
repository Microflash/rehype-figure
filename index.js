import { visit } from "unist-util-visit";
import { whitespace } from "hast-util-whitespace";
import { remove } from "unist-util-remove";
import { h } from "hastscript";

export default function rehypeFigure(options = {}) {
	return (tree) => {
		// unwrap the images inside the paragraph
		visit(tree, { tagName: "p" }, (node, index, parent) => {
			if (!hasOnlyImages(node)) {
				return;
			}

			remove(node, "text");

			parent.children.splice(index, 1, ...node.children);

			return index;
		});

		// wrap images in figure
		visit(tree, (node) => isImageWithAlt(node), (node, index, parent) => {
			if (isImageWithCaption(parent) || isImageLink(parent)) {
				return;
			}

			const figure = createFigure(node, options);

			node.tagName = figure.tagName;
			node.children = figure.children;
			node.properties = figure.properties;
		});
	};
}

function hasOnlyImages({ children }) {
	return children.every((child) => child.tagName === "img" || whitespace(child));
}

function isImageWithAlt({ tagName, properties }) {
	return tagName === "img" && Boolean(properties.alt) && Boolean(properties.src);
}

function isImageWithCaption({ tagName, children }) {
	return tagName === "figure" && children.some((child) => child.tagName === "figcaption");
}

function isImageLink({ tagName }) {
	return tagName === "a";
}

function createFigure({ properties }, options) {
	const props = options.className ? { class: options.className } : {};
	return h("figure", props, [
		h("img", { ...properties }),
		h("figcaption", properties.alt)
	]);
}
