import { Component } from '@angular/core';
import { hlmH1, hlmP } from '@spartan-ng/helm/typography';
import { ICONS_LIST } from './icon-list.const';

@Component({
	selector: 'docs-hero',
	template: `
		<h1 class="${hlmH1}">
			Beautifully crafted, <br />
			animated icons. <br class="sm:hidden" />For <span class="text-red-400">Angular</span>.
		</h1>
		<section class="mx-auto max-w-lg py-4">
			<p class="${hlmP}">
				A collection of {{ iconCount }} hand-crafted, interaction-ready
				<a class="underline hover:opacity-75" href="https://lucide.dev/">Lucide</a> icons. Built natively for Angular
				with zero dependencies. Fully tree-shakeable, MIT-licensed, and completely customizable.
			</p>

			<p class="${hlmP}">
				Thanks to
				<a class="underline hover:opacity-75" href="https://lucide-animated.com/" target="_blank">lucide-animated</a>
				and
				<a class="underline hover:opacity-75" href="https://movingicons.dev/" target="_blank">movingicons</a>.
			</p>
		</section>
	`,
	host: {
		class: 'mx-auto block max-w-2xl px-4 py-18 text-center sm:px-0',
	},
})
export class Hero {
	readonly iconCount = ICONS_LIST.length;
}
