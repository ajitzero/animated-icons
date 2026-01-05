import { NgComponentOutlet } from '@angular/common';
import { Component, computed, input, isDevMode, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import type { IconItem } from './icon-item.type';

@Component({
	selector: 'docs-icon-card',
	template: `
		<span>
			<ng-container [ngComponentOutlet]="icon().component"></ng-container>
		</span>
		<span class="my-2 text-center">{{ icon().name }}</span>
		<div class="flex">
			<a [href]="source()" hlmBtn variant="link" target="_blank">Source</a>
			@if (isDevMode()) {
				<a [href]="svelteSource()" hlmBtn variant="link" target="_blank">Svelte</a>
			}
		</div>
	`,
	host: {
		class: 'flex flex-col items-center p-8 justify-center bg-background group/card rounded-2xl',
	},
	imports: [HlmInputImports, HlmButtonImports, FormsModule, NgComponentOutlet],
})
export class IconCard {
	icon = input.required<IconItem>();

	source = computed(() => {
		const icon = this.icon();
		return `https://github.com/ajitzero/animated-icons/tree/main/packages/animated-icons/src/lib/${icon.name}.ts`;
	});

	svelteSource = computed(() => {
		const icon = this.icon();
		return `https://github.com/jis3r/icons/blob/master/src/lib/icons/${icon.name}.svelte`;
	});

	isDevMode = signal(isDevMode());
}
