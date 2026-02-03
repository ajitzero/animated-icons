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
	selector: 'i-wifi-high',
	template: `
		<svg
			class="wifi-high-icon"
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
			<svg:path d="M12 20h.01" />
			<svg:path class="wifi-level wifi-line-1" d="M8.5 16.429a5 5 0 0 1 7 0" />
			<svg:path class="wifi-level wifi-line-2" d="M5 12.859a10 10 0 0 1 14 0" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.wifi-high-icon {
			overflow: visible;
		}

		.wifi-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.wifi-high-icon.animate .wifi-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.wifi-high-icon.animate .wifi-line-1 {
			opacity: 0;
			animation-delay: 0.25s;
		}

		.wifi-high-icon.animate .wifi-line-2 {
			opacity: 0;
			animation-delay: 0.35s;
		}

		@keyframes fadeInSequence {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'wifi-high',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WifiHighIcon {
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
			this.#timer = setTimeout(() => this.isAnimating.set(false), 700);
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
