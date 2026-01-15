import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, input } from '@angular/core';
import { Explorer } from '../components/explorer';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Hero } from '../components/hero';

@Component({
	selector: 'docs-home',
	template: `
		<docs-header />
		<docs-hero />
		<docs-explorer [search]="search()" />
		<docs-footer />
	`,
	imports: [Header, Hero, Explorer, Footer],
})
export default class Home {
	search = input('', {
		transform: (s: string | string[] | undefined) => coerceStringArray(s).join(', '),
	});
}
