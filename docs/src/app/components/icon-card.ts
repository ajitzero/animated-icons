import { NgComponentOutlet } from '@angular/common';
import { Component, computed, input, isDevMode, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import type { IconItem } from './icon-item.type';

@Component({
	selector: 'docs-icon-card',
	template: `
		<ng-container [ngComponentOutlet]="icon().component" [ngComponentOutletInputs]="componentInputs()"></ng-container>
		<span class="my-2 text-center text-sm">{{ icon().name }}</span>
		<div class="flex h-9 opacity-0 group-hover:opacity-100">
			<a [href]="source()" hlmBtn variant="link" target="_blank">Source</a>
			@if (isDevMode()) {
				<a [href]="svelteSource()" hlmBtn variant="link" target="_blank">Svelte</a>
			}
		</div>
		@if (icon().wip) {
			<span
				class="text-red-500"
				[hlmTooltipTrigger]="'This icon might be working, but I have not verfied it yet'"
				aria-describedby="Simple tooltip"
				hlmBtn
				variant="outline"
				aria-label="Work in progress"
				>WIP</span
			>
		}
	`,
	host: {
		class: 'flex flex-col items-center p-8 pt-16 justify-center bg-background group/card rounded-2xl group',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	imports: [HlmInputImports, HlmButtonImports, HlmTooltipImports, FormsModule, NgComponentOutlet],
})
export class IconCard {
	icon = input.required<IconItem>();

	source = computed(() => {
		const icon = this.icon();
		return `https://github.com/ajitzero/animated-icons/tree/main/packages/animated-icons/src/icons/${icon.name}.ts`;
	});

	svelteSource = computed(() => {
		const icon = this.icon();
		return `https://github.com/jis3r/icons/blob/master/src/lib/icons/${icon.name}.svelte`;
	});

	isDevMode = signal(isDevMode());

	protected isAnimating = signal(false);
	protected componentInputs = computed(() => ({
		size: 36,
		animate: this.isAnimating(),
	}));
}
