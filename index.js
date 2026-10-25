import { join } from "path";

import { listFiles } from "./utils/posts.js";
import { getParsedMarkdownMeta } from './utils/posts.js';
import { copyDirectory, getTemplate, 
	parseHandlebars, 
	saveFile } from "./utils/handlebars.js";
import { getDateString } from "./utils/date.js";
import { DIST_ASSETS_DIR, 
	DIST_DIR, 
	DIST_POSTS_DIR, 
	POSTS_MD_DIR, 
	TEMPLATE_ASSETS_DIR, 
	TEMPLATE_DIR } from "./constants.js";

// Generate the posts and return an array of files with metadata for index generation
const generatePosts = async () => {
	const files = await listFiles("./posts");

	const filesWithMeta = [];

	for (const file of files) {
		const parsedMarkdownMeta = await getParsedMarkdownMeta(join(POSTS_MD_DIR, file));

		const postTemplate = await getTemplate(`${TEMPLATE_DIR}/posts/post.hbs`);
		parsedMarkdownMeta.meta.dateString = getDateString(parsedMarkdownMeta.meta.date);

		const parsedPost = parseHandlebars(postTemplate, { 
			...parsedMarkdownMeta.meta, 
			content: parsedMarkdownMeta.html 
		});

		await saveFile(`${DIST_POSTS_DIR}`,`${file.replace('.md', '.html')}`, parsedPost);
		console.log(`Saved: ${DIST_POSTS_DIR}/${file.replace('.md', '.html')}`);

		filesWithMeta.push({ 
			...parsedMarkdownMeta.meta, 
			url: `./${file.replace('.md', '.html')}` 
		});
	}

	return filesWithMeta;
}

const generateIndex = async (filesForIndex) => {
		const indexTemplate = await getTemplate(`${TEMPLATE_DIR}/index.hbs`);

		const parsedIndex = parseHandlebars(indexTemplate, { 
			posts: filesForIndex.map(file => ({ 
				title: file.title, 
				url: `/posts/${file.slug}.html`, 
				date: file.date, 
				dateString: file.dateString, 
				description: file.description 
			})) 
		});

		await saveFile(`${DIST_DIR}`,`index.html`, parsedIndex);
		console.log(`Saved: ${DIST_DIR}/index.html`);
}

const main = async () => {
	try {

		// Generate the posts and get the list of files with metadata
		const filesForIndex = await generatePosts();

		// Generate the index.html file with the list of posts
		await generateIndex(filesForIndex);

		// Copy assets directory to dist
		await copyDirectory(TEMPLATE_ASSETS_DIR, DIST_ASSETS_DIR);
		console.log(`Copied assets from ${TEMPLATE_ASSETS_DIR} to ${DIST_DIR}`);

	} catch (err) {
		console.error('main: Error:', err);
	}
};


main();
