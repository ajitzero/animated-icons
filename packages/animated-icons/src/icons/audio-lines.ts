import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
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
	selector: 'i-audio-lines',
	template: `
		<svg
			class="audio-lines-icon"
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
			<svg:line x1="2" y1="{line1Y1}" x2="2" y2="{line1Y2}" />
			<svg:line x1="6" y1="{line2Y1}" x2="6" y2="{line2Y2}" />
			<svg:line x1="10" y1="{line3Y1}" x2="10" y2="{line3Y2}" />
			<svg:line x1="14" y1="{line4Y1}" x2="14" y2="{line4Y2}" />
			<svg:line x1="18" y1="{line5Y1}" x2="18" y2="{line5Y2}" />
			<svg:line x1="22" y1="{line6Y1}" x2="22" y2="{line6Y2}" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.audio-lines-icon {
			overflow: visible;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'audio-lines',
		role: 'img',
		'(focusin)': 'handleMouseEnter()',
		'(focusout)': 'handleMouseLeave()',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
		'(touchstart)': 'handleMouseEnter()',
		'(touchend)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AudioLinesIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input<number, NumberInput>(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input<number, NumberInput>(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		this.isAnimating.set(true);
	}
	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
