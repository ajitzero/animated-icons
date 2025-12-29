import { Component, DOCUMENT, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
	selector: 'docs-header',
	template: `
		<a class="font-mono" hlmBtn target="_blank" variant="link" routerLink="/">Animated Icons</a>
		<span>
			<a hlmBtn variant="link" target="_blank" href="https://github.com/ajitzero/animated-icons">Star on GitHub</a>
			<button (click)="toggleTheme()" hlmBtn variant="outline">Theme</button>
		</span>
	`,
	host: {
		class: 'flex justify-between mt-4 items-center max-w-2xl mx-auto',
	},
	imports: [RouterLink, HlmButtonImports],
})
export class Header {
	document = inject(DOCUMENT);

	toggleTheme() {
		if (this.document.documentElement.classList.contains('dark')) {
			this.document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		} else {
			this.document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		}
	}

	constructor() {
		const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const isPreferenceDark = localStorage.getItem('theme') === 'dark';

		if (isPreferenceDark || isSystemDark) {
			this.toggleTheme();
		}
	}
}
