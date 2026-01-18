import type { BooleanInput } from '@angular/cdk/coercion';
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
	selector: 'i-wifi',
	template: `
		<svg
			class="wifi-icon"
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
			<svg:path class="wifi-level wifi-line-3" d="M2 8.82a15 15 0 0 1 20 0" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.wifi-icon {
			overflow: visible;
		}

		.wifi-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.wifi-icon.animate .wifi-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.wifi-icon.animate .wifi-line-1 {
			opacity: 0;
			animation-delay: 0.25s;
		}

		.wifi-icon.animate .wifi-line-2 {
			opacity: 0;
			animation-delay: 0.35s;
		}

		.wifi-icon.animate .wifi-line-3 {
			opacity: 0;
			animation-delay: 0.45s;
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
		'aria-label': 'wifi',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WifiIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
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
