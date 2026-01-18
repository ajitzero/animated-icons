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
	selector: 'i-sliders-vertical',
	template: `
		<svg
			class="sliders-vertical-icon"
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
			<svg:line x1="4" x2="4" y1="21" y2="{line1a_y2}" />
			<svg:line x1="4" x2="4" y1="{line1b_y1}" y2="3" />
			<svg:line x1="2" x2="6" y1="{line1c_y1}" y2="{line1c_y2}" />

			<!-- Group 2 -->
			<svg:line x1="12" x2="12" y1="21" y2="{line2a_y2}" />
			<svg:line x1="12" x2="12" y1="{line2b_y1}" y2="3" />
			<svg:line x1="10" x2="14" y1="{line2c_y1}" y2="{line2c_y2}" />

			<!-- Group 3 -->
			<svg:line x1="20" x2="20" y1="3" y2="{line3a_y2}" />
			<svg:line x1="20" x2="20" y1="{line3b_y1}" y2="21" />
			<svg:line x1="18" x2="22" y1="{line3c_y1}" y2="{line3c_y2}" />
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
		'aria-label': 'sliders-vertical',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidersVerticalIcon {
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
