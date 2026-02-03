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
	selector: 'i-gallery-vertical-end',
	template: `
		<svg
			class="gallery-vertical-end-icon"
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
			<svg:path d="M7 2h10" custom="1" />
			<svg:path d="M5 6h14" custom="2" />
			<svg:rect width="18" height="12" x="3" y="10" rx="2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		path {
			transition:
				transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
				opacity 0.3s ease;
			transform-origin: center;
			opacity: 1;
			transform: translateY(0);
		}

		path[custom='1'].animate {
			animation: disappearThenAppear1 0.6s forwards;
		}

		path[custom='2'].animate {
			animation: disappearThenAppear2 0.6s forwards;
		}

		@keyframes disappearThenAppear1 {
			0% {
				opacity: 0;
				transform: translateY(3px);
			}
			60% {
				opacity: 0;
				transform: translateY(3px);
			}
			80% {
				opacity: 1;
				transform: translateY(0);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@keyframes disappearThenAppear2 {
			0% {
				opacity: 0;
				transform: translateY(3px);
			}
			40% {
				opacity: 0;
				transform: translateY(3px);
			}
			60% {
				opacity: 1;
				transform: translateY(0);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'gallery-vertical-end',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryVerticalEndIcon {
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
