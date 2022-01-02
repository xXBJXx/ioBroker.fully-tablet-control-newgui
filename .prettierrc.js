module.exports = {
	semi: true,
	trailingComma: 'all',
	singleQuote: true,
	printWidth: 120,
	useTabs: true,
	tabWidth: 4,
	endOfLine: 'lf',

	overrides: [
		{
			files: 'admin/src/i18n/*.json',
			options: {
				useTabs: false,
			},
		},
	],

	plugins: [require('prettier-plugin-organize-imports')],
};
