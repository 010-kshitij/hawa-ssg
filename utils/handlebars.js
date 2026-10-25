import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import Handlebars from "handlebars";

export const getTemplate = async (file) => {
  try {
    const data = await readFile(file, 'utf8');
		return data;
  } catch (err) {
    console.error('scanPosts: Error reading file:', err);
		process.exit(1);
  }
}

export const parseHandlebars = (template, metadata) => {
	const parse = Handlebars.compile(template);
	return parse(metadata);
} 

export const saveFile = async (directory, file, data) => {
	try {
		await mkdir(directory, { recursive: true });
		await writeFile(`${directory}/${file}`, data, 'utf8');
	} catch (err) {
		console.error('saveFile: Error writing file:', err);
		process.exit(1);
	}
}

// Copy assets directory to dist
export const copyDirectory = async (sourceDir, destDir) => {

	await mkdir(destDir, { recursive: true });

	const files = await readdir(sourceDir);

	for (const file of files) {
		const sourceFile = path.join(sourceDir, file);
		const destFile = path.join(destDir, file);
		await copyFile(sourceFile, destFile);
		console.log(`Copied: ${sourceFile} to ${destFile}`);
	}
};
