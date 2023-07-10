import { css } from 'lit';

/**
 * Global Styles - can be imported in Lit components and referenced in your style definition.
 * @ref https://material.io/design/color/the-color-system.html
 */
export let theme = css`
	:host {
		--color-primary: #0094ca;
		--color-primary-dark: #0184b4;

		--color-secondary: #2f1eaf;

		--color-background: #1e1e20;
		--color-background-light: #2c2c2f;
		--color-background-dark: #131314;
		/* --color-on-background: #535353; */

		--color-disabled: #525252;

		/* --color-surface: #ffffff; */
		/* --color-on-surface: #535353; */

		--color-text: #f2f2f2;
	}
`;
export default theme;
