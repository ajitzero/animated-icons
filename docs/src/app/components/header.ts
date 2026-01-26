import { ChangeDetectionStrategy, Component, computed, DOCUMENT, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';

@Component({
	selector: 'docs-header',
	template: `
		<a class="font-mono" hlmBtn target="_blank" variant="link" routerLink="/">Animated Icons</a>
		<span class="flex items-center">
			<a hlmBtn variant="link" target="_blank" href="https://github.com/ajitzero/animated-icons">
				<ng-icon hlm size="sm" name="lucideGithub" />
				GitHub
			</a>
			<button
				class="transition-transform active:translate-y-0.5"
				[hlmTooltipTrigger]="themeLabel()"
				[aria-describedby]="themeLabel()"
				(click)="toggleTheme()"
				hlmBtn
				variant="outline"
			>
				@if (theme() === 'light') {
					<ng-icon hlm size="sm" name="lucideSun" />
				} @else {
					<ng-icon hlm size="sm" name="lucideMoon" />
				}
			</button>
		</span>
	`,
	host: {
		class: 'flex justify-between mt-4 items-center max-w-2xl mx-auto px-4 md:px-0',
	},
	providers: [provideIcons({ lucideGithub, lucideMoon, lucideSun })],
	imports: [RouterLink, HlmButtonImports, HlmIconImports, HlmTooltipImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
	document = inject(DOCUMENT);

	theme = signal<'light' | 'dark'>('light');
	themeLabel = computed(() => 'Switch to ' + (this.theme() === 'light' ? 'dark' : 'light') + ' mode');

	toggleTheme() {
		if (this.document.documentElement.classList.contains('dark')) {
			this.document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
			this.theme.set('light');
		} else {
			this.document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
			this.theme.set('dark');
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
