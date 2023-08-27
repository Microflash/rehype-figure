export default [
	{
		title: "image with alt text as plaintext",
		input: `![Image](http://example.com/test.png)`,
		output: `<figure><img src="http://example.com/test.png" alt="Image"><figcaption>Image</figcaption></figure>`
	},
	{
		title: "image with alt text and custom classes",
		input: `![Image](http://example.com/test.png)`,
		output: `<figure class="figure"><img src="http://example.com/test.png" alt="Image"><figcaption>Image</figcaption></figure>`,
		options: {
			className: "figure",
		}
	},
	{
		title: "image with alt text containing markdown",
		input: `![Image with **strong** _emphasis_](http://example.com/test.png)`,
		output: `<figure><img src="http://example.com/test.png" alt="Image with strong emphasis"><figcaption>Image with strong emphasis</figcaption></figure>`
	},
	{
		title: "image with no alt text",
		input: `![](http://example.com/test.png)`,
		output: `<img src="http://example.com/test.png" alt="">`
	},
	{
		title: "raw image markup with caption",
		input: `<figure><img src="http://example.com/captioned.png" alt="Captioned image"><figcaption><em>Captioned image</em></figcaption></figure>`,
		output: `<figure><img src="http://example.com/captioned.png" alt="Captioned image"><figcaption><em>Captioned image</em></figcaption></figure>`
	},
	{
		title: "raw image markup without caption",
		input: `<img src="http://example.com/captioned.png" alt="Captioned image">`,
		output: `<img src="http://example.com/captioned.png" alt="Captioned image">`
	},
	{
		title: "link with image",
		input: `[![Image](http://example.com/test.png)](http://example.com)`,
		output: `<p><a href="http://example.com"><img src="http://example.com/test.png" alt="Image"></a></p>`
	},
	{
		title: "paragraph with only images",
		input: `\n\n![Image 1](http://example.com/test1.png)\n![Image 2](http://example.com/test2.png)\n\n`,
		output: `<figure><img src="http://example.com/test1.png" alt="Image 1"><figcaption>Image 1</figcaption></figure><figure><img src="http://example.com/test2.png" alt="Image 2"><figcaption>Image 2</figcaption></figure>`
	},
	{
		title: "paragraph with no images",
		input: `A paragraph bereft of images`,
		output: `<p>A paragraph bereft of images</p>`
	},
];
