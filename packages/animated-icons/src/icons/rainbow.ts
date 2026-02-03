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
	selector: 'i-rainbow',
	template: `
		<svg
			class="rainbow-icon"
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
			<svg:path class="arc-1" d="M22 17a10 10 0 0 0-20 0" />
			<svg:path class="arc-2" d="M18 17a6 6 0 0 0-12 0" />
			<svg:path class="arc-3" d="M14 17a2 2 0 0 0-4 0" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.arc-1 {
			fill: none;
			stroke-dasharray: 32;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.4s ease-out;
		}
		.arc-2 {
			fill: none;
			stroke-dasharray: 19;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.4s ease-out;
		}
		.arc-3 {
			fill: none;
			stroke-dasharray: 7;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.4s ease-out;
		}

		.rainbow-icon.animate .arc-1 {
			animation: draw1 0.8s ease-out forwards;
		}

		.rainbow-icon.animate .arc-2 {
			animation: draw2 0.8s ease-out forwards;
		}

		.rainbow-icon.animate .arc-3 {
			animation: draw3 0.8s ease-out forwards;
		}

		@keyframes draw1 {
			0%,
			15% {
				stroke-dashoffset: 32;
			}
			100% {
				stroke-dashoffset: 64;
			}
		}
		@keyframes draw2 {
			0%,
			15% {
				stroke-dashoffset: 19;
			}
			100% {
				stroke-dashoffset: 38;
			}
		}
		@keyframes draw3 {
			0% {
				stroke-dashoffset: 7;
			}
			100% {
				stroke-dashoffset: 14;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'rainbow',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RainbowIcon {
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
			this.#timer = setTimeout(() => this.isAnimating.set(false), 800);
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
