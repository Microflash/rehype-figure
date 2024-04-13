# rehype-figure

[![npm](https://img.shields.io/npm/v/@microflash/rehype-figure)](https://www.npmjs.com/package/@microflash/rehype-figure)
[![regression](https://github.com/Microflash/rehype-figure/actions/workflows/regression.yml/badge.svg)](https://github.com/Microflash/rehype-figure/actions/workflows/regression.yml)
[![license](https://img.shields.io/npm/l/@microflash/rehype-figure)](./LICENSE.md)

[rehype](https://github.com/rehypejs/rehype) plugin to transform an image with alt text to a figure with caption

## Status: feature complete

> [!IMPORTANT]
> Converting an image with alt text to a figure with caption is an [escape hatch](https://en.wiktionary.org/wiki/escape_hatch). Alt text, title, and captions have [different intended purposes](https://www.stylemanual.gov.au/content-types/images/alt-text-captions-and-titles-images), and you should eventually enhance your content to adopt them.

- [What's this?](#whats-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
- [License](#license)

## What's this?

This package is a [unified](https://github.com/unifiedjs/unified) ([rehype](https://github.com/rehypejs/rehype)) plugin that takes an image node with alt text (e.g., `![Alt text](path-to-image.jpg)`) and converts it to a [figure](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) element with caption.

```html
<figure>
  <img src="path-to-image.jpg" alt="Alt text">
  <figcaption>Alt Text</figcaption>
</figure>
```

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

In Node.js (16.0+), install with [npm](https://docs.npmjs.com/cli/install):

```sh
npm install @microflash/rehype-figure
```

> For Node.js versions below 16.0, stick to 1.x.x versions of this plugin.

In Deno, with [esm.sh](https://esm.sh/):

```js
import rehypeFigure from "https://esm.sh/@microflash/rehype-figure";
```

In browsers, with [esm.sh](https://esm.sh/):

```html
<script type="module">
  import rehypeFigure from "https://esm.sh/@microflash/rehype-figure?bundle";
</script>
```

## Use

Say we have the following module `example.js`:

```js
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeFigure from "@microflash/rehype-figure";
import rehypeStringify from "rehype-stringify";

main()

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeFigure)
    .use(rehypeStringify)
    .process("![Alt text](path-to-image.jpg)");

  console.log(String(file));
}
```

Running that with `node example.js` yields:

```html
<figure>
  <img src="path-to-image.jpg" alt="Alt Text">
  <figcaption>Alt Text</figcaption>
</figure>
```

## API

The default export is `rehypeFigure`.

The following options are available. All of them are optional.

- `className`: class for the wrapped `figure` element

By default, no classes are added to the `figure` element.

## License

[MIT](./LICENSE.md)
