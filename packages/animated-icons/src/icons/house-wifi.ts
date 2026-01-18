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
	selector: 'i-house-wifi',
	template: `
		<svg
			class="house-wifi-icon"
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
			<svg:path class="wifi-level wifi-line-1" d="M9.5 13.866a4 4 0 0 1 5 .01" />
			<svg:path class="wifi-level wifi-dot" d="M12 17h.01" />
			<svg:path
				d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
			/>
			<svg:path class="wifi-level wifi-line-2" d="M7 10.754a8 8 0 0 1 10 0" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.house-wifi-icon {
			overflow: visible;
		}

		.wifi-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.house-wifi-icon.animate .wifi-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.house-wifi-icon.animate .wifi-dot {
			opacity: 0;
			animation-delay: 0.25s;
		}

		.house-wifi-icon.animate .wifi-line-1 {
			opacity: 0;
			animation-delay: 0.35s;
		}

		.house-wifi-icon.animate .wifi-line-2 {
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
		'aria-label': 'house-wifi',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HouseWifiIcon {
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
