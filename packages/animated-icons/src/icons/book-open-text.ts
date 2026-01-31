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
	selector: 'i-book-open-text',
	template: `
		<svg
			class="book-open-text-icon"
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
			<svg:path class="center-line" d="M12 7v14" />
			<svg:path class="text-line text-line-right-bottom" d="M16 12h2" />
			<svg:path class="text-line text-line-right-top" d="M16 8h2" />
			<svg:path
				class="book-path"
				d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
			/>
			<svg:path class="text-line text-line-left-bottom" d="M6 12h2" />
			<svg:path class="text-line text-line-left-top" d="M6 8h2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.book-open-text-icon {
			overflow: visible;
			transform-origin: center;
			transition: transform 0.3s ease;
		}

		.book-open-text-icon.animate {
			animation: bookOpen 0.8s ease;
		}

		.book-path {
			transform-origin: center bottom;
			transition: transform 0.3s ease;
		}

		.book-open-text-icon.animate .book-path {
			animation: bookPages 0.8s ease;
		}

		.center-line {
			transform-origin: center bottom;
			transition: transform 0.3s ease;
		}

		.book-open-text-icon.animate .center-line {
			animation: bookPages 0.8s ease;
		}

		.text-line {
			stroke-dasharray: 3;
			stroke-dashoffset: 0;
			transform-origin: center bottom;
			transition:
				stroke-dashoffset 0s,
				transform 0.3s ease;
		}

		.book-open-text-icon.animate .text-line {
			stroke-dashoffset: 3;
			animation: bookPages 0.8s ease;
		}

		.book-open-text-icon.animate .text-line-left-top {
			animation:
				bookPages 0.8s ease,
				drawLine 0.4s ease 0.2s forwards;
		}

		.book-open-text-icon.animate .text-line-left-bottom {
			animation:
				bookPages 0.8s ease,
				drawLine 0.4s ease 0.4s forwards;
		}

		.book-open-text-icon.animate .text-line-right-top {
			animation:
				bookPages 0.8s ease,
				drawLine 0.4s ease 0.6s forwards;
		}

		.book-open-text-icon.animate .text-line-right-bottom {
			animation:
				bookPages 0.8s ease,
				drawLine 0.4s ease 0.8s forwards;
		}

		@keyframes bookOpen {
			0% {
				transform: scale(1);
			}
			20% {
				transform: scale(1.05);
			}
			100% {
				transform: scale(1);
			}
		}

		@keyframes bookPages {
			0% {
				transform: scaleY(1);
			}
			30% {
				transform: scaleY(1.1);
			}
			100% {
				transform: scaleY(1);
			}
		}

		@keyframes drawLine {
			0% {
				stroke-dashoffset: 3;
			}
			100% {
				stroke-dashoffset: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'book-open-text',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookOpenTextIcon {
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
			this.#timer = setTimeout(() => this.isAnimating.set(false), 1500);
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
