import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	linkedSignal,
	numberAttribute,
} from '@angular/core';
import { ANIMATED_ICONS_CONFIG } from '../tokens/provider';

@Component({
	selector: 'i-radar',
	template: `
		<svg
			class="radar-icon"
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
			<svg:path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
			<svg:path d="M4 6h.01" />
			<svg:path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
			<svg:path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
			<svg:path d="M12 18h.01" />
			<svg:path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
			<svg:circle cx="12" cy="12" r="2" />
			<svg:path class="radar-hand" d="m13.41 10.59 5.66-5.66" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.radar-icon .radar-hand {
			transform-origin: center center;
			transition: transform 1s ease-in-out;
		}

		.radar-icon.animate .radar-hand {
			animation: rotate-path 2s linear;
		}

		@keyframes rotate-path {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(720deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'radar',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadarIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input<number, NumberInput>(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input<number, NumberInput>(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	#timer: ReturnType<typeof setTimeout> | null = null;

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			this.#timer = setTimeout(() => this.isAnimating.set(false), 2000);
		}
	}

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
			} else {
				if (this.#timer) {
					clearTimeout(this.#timer);
					this.#timer = null;
				}
			}
		});
	}
}
