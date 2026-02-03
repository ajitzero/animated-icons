import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { provideAnimatedIcons } from 'ng-animated-icons';
import type { IconItem } from './icon-item.type';

@Component({
	selector: 'docs-icon-card',
	template: `
		<ng-container [ngComponentOutlet]="icon().component" [ngComponentOutletInputs]="componentInputs()"></ng-container>
		<span class="my-2 text-center text-sm">{{ icon().name }}</span>
		<div class="flex h-9 group-focus-within:opacity-100 group-hover:opacity-100 focus:opacity-100 md:opacity-0">
			<a [href]="source()" hlmBtn variant="ghost" target="_blank">Source</a>
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
		'(focusin)': 'isAnimating.set(true)',
		'(focusout)': 'isAnimating.set(false)',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
		'(touchstart)': 'isAnimating.set(true)',
		'(touchend)': 'isAnimating.set(false)',
	},
	providers: [provideAnimatedIcons({ size: 36 })],
	imports: [HlmInputImports, HlmButtonImports, HlmTooltipImports, FormsModule, NgComponentOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCard {
	icon = input.required<IconItem>();

	source = computed(() => {
		const icon = this.icon();
		return `https://github.com/ajitzero/animated-icons/tree/main/packages/animated-icons/src/icons/${icon.name}.ts`;
	});

	protected isAnimating = signal(false);
	protected componentInputs = computed(() => ({ animate: this.isAnimating() }));
}
