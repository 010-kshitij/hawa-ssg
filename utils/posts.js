import { readdir, readFile } from 'node:fs/promises';
import matter from "gray-matter";
import { marked } from "marked";

export const getParsedMarkdownMeta = async (file) => {
  try {
    const data = await readFile(file, 'utf8');
		const meta = matter(data);
		const html = marked.parse(meta.content);
		meta.data.slug = file.split('/').pop().replace('.md', '');
		if(!meta.data.title || !meta.data.date || !meta.data.description) {
			throw `scanPosts: Missing required metadata in file ${file}, check that title, date and description are present in the frontmatter.`;
		}
		return { meta: meta.data, html };
  } catch (err) {
    console.error('scanPosts: Error reading file:', err);
		process.exit(1);
  }
}

export const listFiles = async (directoryPath) => {
	try {
		const files = await readdir(directoryPath);
		return files;
	}
	catch(error) {
		console.error("posts: Error listing files:", error);
	}
}
