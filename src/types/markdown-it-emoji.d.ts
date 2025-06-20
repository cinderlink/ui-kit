declare module 'markdown-it-emoji' {
	import type MarkdownIt from 'markdown-it';

	interface EmojiPlugin {
		(md: MarkdownIt): void;
	}

	const emojiPlugin: EmojiPlugin;
	export = emojiPlugin;
}
