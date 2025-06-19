import { EditorView } from '@codemirror/view';
import { tags as t } from '@lezer/highlight';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import type { Extension } from '@codemirror/state';

// Light theme colors based on Tokyo Night Day
const lightColors = {
	background: '#e1e2e7',
	foreground: '#3760bf',
	caret: '#3760bf',
	selection: '#99a7df',
	lineHighlight: '#d5d6db',
	gutterBackground: '#e1e2e7',
	gutterForeground: '#7a8394',
	comment: '#848cb5',
	variable: '#3760bf',
	string: '#587539',
	keyword: '#9854f1',
	number: '#b15c00',
	function: '#007197',
	operator: '#9854f1',
	className: '#007197',
	constant: '#007197',
	bracket: '#3760bf'
};

// Dark theme colors based on Tokyo Night Storm
const darkColors = {
	background: '#24283b',
	foreground: '#a9b1d6',
	caret: '#c0caf5',
	selection: '#515c7e40',
	lineHighlight: '#292e42',
	gutterBackground: '#24283b',
	gutterForeground: '#737aa2',
	comment: '#565f89',
	variable: '#c0caf5',
	string: '#9ece6a',
	keyword: '#bb9af7',
	number: '#ff9e64',
	function: '#7aa2f7',
	operator: '#bb9af7',
	className: '#7aa2f7',
	constant: '#7aa2f7',
	bracket: '#a9b1d6'
};

export function createLightTheme(): Extension {
	const lightHighlightStyle = HighlightStyle.define([
		{ tag: t.comment, color: lightColors.comment },
		{ tag: t.variableName, color: lightColors.variable },
		{ tag: [t.string, t.special(t.string)], color: lightColors.string },
		{ tag: t.number, color: lightColors.number },
		{ tag: t.bool, color: lightColors.keyword },
		{ tag: t.null, color: lightColors.keyword },
		{ tag: t.keyword, color: lightColors.keyword },
		{ tag: t.operator, color: lightColors.operator },
		{ tag: t.className, color: lightColors.className },
		{ tag: t.definition(t.typeName), color: lightColors.className },
		{ tag: t.typeName, color: lightColors.className },
		{ tag: t.angleBracket, color: lightColors.bracket },
		{ tag: t.tagName, color: lightColors.keyword },
		{ tag: t.attributeName, color: lightColors.function },
		{ tag: [t.function(t.variableName), t.function(t.propertyName)], color: lightColors.function },
		{ tag: [t.propertyName], color: lightColors.function },
		{ tag: [t.constant(t.name), t.standard(t.name)], color: lightColors.constant },
		{ tag: [t.separator], color: lightColors.foreground },
		{ tag: [t.bracket], color: lightColors.bracket }
	]);

	const lightTheme = EditorView.theme(
		{
			'&': {
				color: lightColors.foreground,
				backgroundColor: lightColors.background
			},
			'.cm-content': {
				caretColor: lightColors.caret
			},
			'.cm-cursor, .cm-dropCursor': { borderLeftColor: lightColors.caret },
			'&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
				{ backgroundColor: lightColors.selection },
			'.cm-panels': { backgroundColor: lightColors.background, color: lightColors.foreground },
			'.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
			'.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },
			'.cm-searchMatch': {
				backgroundColor: '#72a1ff59',
				outline: '1px solid #457dff'
			},
			'.cm-searchMatch.cm-searchMatch-selected': {
				backgroundColor: '#6199ff2f'
			},
			'.cm-activeLine': { backgroundColor: lightColors.lineHighlight },
			'.cm-selectionMatch': { backgroundColor: '#aafe661a' },
			'&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
				backgroundColor: '#bad0f847'
			},
			'.cm-gutters': {
				backgroundColor: lightColors.gutterBackground,
				color: lightColors.gutterForeground,
				border: 'none'
			},
			'.cm-activeLineGutter': {
				backgroundColor: lightColors.lineHighlight
			},
			'.cm-foldPlaceholder': {
				backgroundColor: 'transparent',
				border: 'none',
				color: '#ddd'
			},
			'.cm-tooltip': {
				border: 'none',
				backgroundColor: lightColors.background
			},
			'.cm-tooltip .cm-tooltip-arrow:before': {
				borderTopColor: 'transparent',
				borderBottomColor: 'transparent'
			},
			'.cm-tooltip .cm-tooltip-arrow:after': {
				borderTopColor: lightColors.background,
				borderBottomColor: lightColors.background
			},
			'.cm-tooltip-autocomplete': {
				'& > ul > li[aria-selected]': {
					backgroundColor: lightColors.lineHighlight,
					color: lightColors.foreground
				}
			}
		},
		{ dark: false }
	);

	return [lightTheme, syntaxHighlighting(lightHighlightStyle)];
}

export function createDarkTheme(): Extension {
	const darkHighlightStyle = HighlightStyle.define([
		{ tag: t.comment, color: darkColors.comment },
		{ tag: t.variableName, color: darkColors.variable },
		{ tag: [t.string, t.special(t.string)], color: darkColors.string },
		{ tag: t.number, color: darkColors.number },
		{ tag: t.bool, color: darkColors.keyword },
		{ tag: t.null, color: darkColors.keyword },
		{ tag: t.keyword, color: darkColors.keyword },
		{ tag: t.operator, color: darkColors.operator },
		{ tag: t.className, color: darkColors.className },
		{ tag: t.definition(t.typeName), color: darkColors.className },
		{ tag: t.typeName, color: darkColors.className },
		{ tag: t.angleBracket, color: darkColors.bracket },
		{ tag: t.tagName, color: darkColors.keyword },
		{ tag: t.attributeName, color: darkColors.function },
		{ tag: [t.function(t.variableName), t.function(t.propertyName)], color: darkColors.function },
		{ tag: [t.propertyName], color: darkColors.function },
		{ tag: [t.constant(t.name), t.standard(t.name)], color: darkColors.constant },
		{ tag: [t.separator], color: darkColors.foreground },
		{ tag: [t.bracket], color: darkColors.bracket }
	]);

	const darkTheme = EditorView.theme(
		{
			'&': {
				color: darkColors.foreground,
				backgroundColor: darkColors.background
			},
			'.cm-content': {
				caretColor: darkColors.caret
			},
			'.cm-cursor, .cm-dropCursor': { borderLeftColor: darkColors.caret },
			'&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
				{ backgroundColor: darkColors.selection },
			'.cm-panels': { backgroundColor: darkColors.background, color: darkColors.foreground },
			'.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
			'.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },
			'.cm-searchMatch': {
				backgroundColor: '#72a1ff59',
				outline: '1px solid #457dff'
			},
			'.cm-searchMatch.cm-searchMatch-selected': {
				backgroundColor: '#6199ff2f'
			},
			'.cm-activeLine': { backgroundColor: darkColors.lineHighlight },
			'.cm-selectionMatch': { backgroundColor: '#aafe661a' },
			'&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
				backgroundColor: '#bad0f847'
			},
			'.cm-gutters': {
				backgroundColor: darkColors.gutterBackground,
				color: darkColors.gutterForeground,
				border: 'none'
			},
			'.cm-activeLineGutter': {
				backgroundColor: darkColors.lineHighlight
			},
			'.cm-foldPlaceholder': {
				backgroundColor: 'transparent',
				border: 'none',
				color: '#ddd'
			},
			'.cm-tooltip': {
				border: 'none',
				backgroundColor: darkColors.background
			},
			'.cm-tooltip .cm-tooltip-arrow:before': {
				borderTopColor: 'transparent',
				borderBottomColor: 'transparent'
			},
			'.cm-tooltip .cm-tooltip-arrow:after': {
				borderTopColor: darkColors.background,
				borderBottomColor: darkColors.background
			},
			'.cm-tooltip-autocomplete': {
				'& > ul > li[aria-selected]': {
					backgroundColor: darkColors.lineHighlight,
					color: darkColors.foreground
				}
			}
		},
		{ dark: true }
	);

	return [darkTheme, syntaxHighlighting(darkHighlightStyle)];
}
