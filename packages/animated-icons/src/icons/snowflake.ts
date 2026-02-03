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
	selector: 'i-snowflake',
	template: `
		<svg
			class="snowflake-icon"
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
			<svg:path d="m10 20-1.25-2.5L6 18" />
			<svg:path d="M10 4 8.75 6.5 6 6" />
			<svg:path d="m14 20 1.25-2.5L18 18" />
			<svg:path d="m14 4 1.25 2.5L18 6" />
			<svg:path d="m17 21-3-6h-4" />
			<svg:path d="m17 3-3 6 1.5 3" />
			<svg:path d="M2 12h6.5L10 9" />
			<svg:path d="m20 10-1.5 2 1.5 2" />
			<svg:path d="M22 12h-6.5L14 15" />
			<svg:path d="m4 10 1.5 2L4 14" />
			<svg:path d="m7 21 3-6-1.5-3" />
			<svg:path d="m7 3 3 6h4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.snowflake-icon {
			transform-origin: center;
		}

		.snowflake-icon.animate {
			animation: rotate 0.4s ease-in-out;
		}

		@keyframes rotate {
			0% {
				transform: rotate(0deg);
			}
			20% {
				transform: rotate(-5deg);
			}
			40% {
				transform: rotate(5deg);
			}
			60% {
				transform: rotate(-5deg);
			}
			80% {
				transform: rotate(5deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'snowflake',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnowflakeIcon {
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
