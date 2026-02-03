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
	selector: 'i-bell-ring',
	template: `
		<svg
			class="bell-ring-icon"
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
			<svg:path class="bell" d="M4 2C2.8 3.7 2 5.7 2 8" />
			<svg:path class="bell" d="M22 8c0-2.3-.8-4.3-2-6" />
			<svg:path
				class="bell"
				d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
			/>
			<svg:path class="clapper" d="M10.268 21a2 2 0 0 0 3.464 0" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.bell-ring-icon.animate {
			transform-origin: top center;
			animation: bellRing 0.9s ease-in-out;
		}

		.bell-ring-icon.animate .bell {
			animation: bellMove 1.1s ease-in-out;
		}

		.bell-ring-icon.animate .clapper {
			animation: clapperMove 1.1s ease-in-out;
		}

		@keyframes bellRing {
			0% {
				transform: rotate(0deg);
			}
			16.67% {
				transform: rotate(20deg);
			}
			33.33% {
				transform: rotate(-10deg);
			}
			50% {
				transform: rotate(10deg);
			}
			66.67% {
				transform: rotate(-5deg);
			}
			83.33% {
				transform: rotate(3deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}

		@keyframes clapperMove {
			0% {
				transform: translateX(0);
			}
			14.29% {
				transform: translateX(-6px);
			}
			28.57% {
				transform: translateX(5px);
			}
			42.86% {
				transform: translateX(-5px);
			}
			57.14% {
				transform: translateX(4px);
			}
			71.43% {
				transform: translateX(-3px);
			}
			85.71% {
				transform: translateX(2px);
			}
			100% {
				transform: translateX(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'bell-ring',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BellRingIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	#timer: ReturnType<typeof setTimeout> | null = null;

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			this.#timer = setTimeout(() => this.isAnimating.set(false), 1100);
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
