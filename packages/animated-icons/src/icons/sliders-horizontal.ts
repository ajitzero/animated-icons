import type { BooleanInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	linkedSignal,
	numberAttribute,
} from '@angular/core';
import { ANIMATED_ICONS_CONFIG } from '../tokens/provider';

@Component({
	selector: 'i-sliders-horizontal',
	template: `
		<svg
			class="sliders-horizontal-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isAnimating()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<!-- Group 1 -->
			<svg:line x1="21" x2="{line1a_x2}" y1="4" y2="4" />
			<svg:line x1="{line1b_x1}" x2="3" y1="4" y2="4" />
			<svg:line x1="{line1c_x1}" x2="{line1c_x2}" y1="2" y2="6" />

			<!-- Group 2 -->
			<svg:line x1="21" x2="{line2a_x2}" y1="12" y2="12" />
			<svg:line x1="{line2b_x1}" x2="3" y1="12" y2="12" />
			<svg:line x1="{line2c_x1}" x2="{line2c_x2}" y1="10" y2="14" />

			<!-- Group 3 -->
			<svg:line x1="3" x2="{line3a_x2}" y1="20" y2="20" />
			<svg:line x1="{line3b_x1}" x2="21" y1="20" y2="20" />
			<svg:line x1="{line3c_x1}" x2="{line3c_x2}" y1="18" y2="22" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.sliders-icon {
			overflow: visible;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'sliders-horizontal',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidersHorizontalIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
