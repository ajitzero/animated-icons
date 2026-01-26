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
	selector: 'i-gallery-horizontal',
	template: `
		<svg
			class="gallery-horizontal-icon"
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
			<svg:path class="gallery-path gallery-path-1" d="M2 3v18" />
			<svg:rect class="gallery-rect" width="12" height="18" x="6" y="3" rx="2" />
			<svg:path class="gallery-path gallery-path-2" d="M22 3v18" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.gallery-horizontal-icon {
			overflow: visible;
		}

		.gallery-path {
			opacity: 1;
			transform: scale(1) translateX(0);
			transform-origin: center;
		}

		.gallery-rect {
			opacity: 1;
			transform: scale(1);
			transform-origin: center;
		}

		.gallery-horizontal-icon.animate .gallery-path-1 {
			animation: slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
		}

		.gallery-horizontal-icon.animate .gallery-path-2 {
			animation: slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
		}

		@keyframes slideInLeft {
			0% {
				opacity: 0;
				transform: scale(0.8) translateX(4px);
			}
			100% {
				opacity: 1;
				transform: scale(1) translateX(0);
			}
		}

		@keyframes slideInRight {
			0% {
				opacity: 0;
				transform: scale(0.8) translateX(-4px);
			}
			100% {
				opacity: 1;
				transform: scale(1) translateX(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'gallery-horizontal',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryHorizontalIcon {
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
