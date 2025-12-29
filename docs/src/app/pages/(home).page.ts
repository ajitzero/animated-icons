import { Component } from '@angular/core';
import { Explorer } from '../components/explorer';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Hero } from '../components/hero';

@Component({
	selector: 'docs-home',
	template: `
		<docs-header />
		<docs-hero />
		<docs-explorer />
		<docs-footer />
	`,
	imports: [Header, Hero, Explorer, Footer],
})
export default class Home {}
