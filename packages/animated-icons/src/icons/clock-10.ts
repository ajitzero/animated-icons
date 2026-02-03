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
	selector: 'i-clock-10',
	template: `
		<svg
			class="clock-10-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:circle cx="12" cy="12" r="10" />
			<svg:line class="minute-hand" [class.animate]="isAnimating()" x1="12" y1="6" x2="12" y2="12" />
			<svg:line class="hour-hand" [class.animate]="isAnimating()" x1="12" y1="12" x2="8" y2="10" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.minute-hand,
		.hour-hand {
			transform-origin: center;
			transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.hour-hand {
			transition-duration: 0.5s;
			transition-timing-function: ease-in-out;
		}

		.minute-hand.animate {
			transform: rotate(360deg);
		}

		.hour-hand.animate {
			transform: rotate(30deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'clock-10',
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
export class Clock10Icon {
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
