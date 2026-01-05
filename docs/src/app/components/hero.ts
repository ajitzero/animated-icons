import { Component } from '@angular/core';
import { hlmH1, hlmP } from '@spartan-ng/helm/typography';

@Component({
	selector: 'docs-hero',
	template: `
		<h1 class="${hlmH1}">
			Beautifully crafted, <br />
			animated icons. <br class="sm:hidden" />For <span class="text-red-400">Angular</span>.
		</h1>
		<section class="mx-auto max-w-lg py-4">
			<p class="${hlmP}">
				An open-source (<a
					class="underline hover:opacity-75"
					href="https://github.com/ajitzero/animated-icons/blob/main/LICENSE"
					>MIT License</a
				>) collection of smooth animated icons for your projects. Feel free to use them, share your feedback, and let's
				make this library awesome together
			</p>

			<p class="${hlmP}">
				Thanks to
				<a class="underline hover:opacity-75" href="https://lucide-animated.com/">pqoqubbw/icons</a>. Built with
				<!-- <a class="underline hover:opacity-75" href="https://motion.dev/">Motion</a> -->
				<!-- and -->
				<a class="underline hover:opacity-75" href="https://lucide.dev/">Lucide</a>.
			</p>
		</section>
	`,
	host: {
		class: 'block py-18 max-w-2xl mx-auto text-center',
	},
})
export class Hero {}
