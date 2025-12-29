import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
	selector: 'docs-footer',
	template: `
		<span>
			<span class="opacity-30">&copy;</span>
			<a class="px-1 font-mono" hlmBtn target="_blank" variant="link" href="https://github.com/ajitzero"
				>Ajit Panigrahi</a
			>
		</span>
		<a hlmBtn variant="link" target="_blank" href="https://github.com/ajitzero/animated-icons">View Source</a>
	`,
	host: {
		class: 'flex justify-between mt-16 mb-24 items-center max-w-2xl mx-auto',
	},
	imports: [RouterLink, HlmButton],
})
export class Footer {}
