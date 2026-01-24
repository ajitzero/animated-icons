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
	selector: 'i-landmark',
	template: `
		<svg
			class="landmark-icon"
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
			<svg:line class="floor" x1="3" x2="21" y1="22" y2="22" />
			<svg:line class="column-1" x1="6" x2="6" y1="18" y2="11" />
			<svg:line class="column-2" x1="10" x2="10" y1="18" y2="11" />
			<svg:line class="column-3" x1="14" x2="14" y1="18" y2="11" />
			<svg:line class="column-4" x1="18" x2="18" y1="18" y2="11" />
			<svg:polygon class="roof" points="12 2 20 7 4 7" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.landmark-icon {
			overflow: visible;
		}

		.landmark-icon.animate .column-1 {
			opacity: 0;
			animation: fadeInLeft 0.35s ease-out 0.3s forwards;
		}

		.landmark-icon.animate .column-2 {
			opacity: 0;
			animation: fadeInLeft 0.35s ease-out 0.2s forwards;
		}

		.landmark-icon.animate .column-3 {
			opacity: 0;
			animation: fadeInLeft 0.35s ease-out 0.1s forwards;
		}

		.landmark-icon.animate .column-4 {
			opacity: 0;
			animation: fadeInLeft 0.35s ease-out 0s forwards;
		}

		.landmark-icon.animate .roof {
			opacity: 0;
			animation: fadeInTop 0.35s ease-out 0.4s forwards;
		}

		@keyframes fadeInLeft {
			0%,
			50% {
				opacity: 0;
				transform: translateX(-10px);
			}
			80% {
				opacity: 0.8;
				transform: translateX(2px);
			}
			100% {
				opacity: 1;
				transform: translateX(0);
			}
		}

		@keyframes fadeInTop {
			0%,
			50% {
				opacity: 0;
				transform: translateY(-10px);
			}
			80% {
				opacity: 0.8;
				transform: translateY(2px);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'landmark',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandmarkIcon {
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
			this.#timer = setTimeout(() => this.isAnimating.set(false), 1400);
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
