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
	selector: 'i-wifi-pen',
	template: `
		<svg
			class="wifi-pen-icon"
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
			<svg:path class="wifi-level wifi-line-3" d="M2 8.82a15 15 0 0 1 20 0" />
			<svg:path
				class=""
				d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
			/>
			<svg:path class="wifi-level wifi-line-2" d="M5 12.859a10 10 0 0 1 10.5-2.222" />
			<svg:path class="wifi-level wifi-line-1" d="M8.5 16.429a5 5 0 0 1 3-1.406" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.wifi-pen-icon {
			overflow: visible;
		}

		.wifi-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.wifi-pen-icon.animate .wifi-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.wifi-pen-icon.animate .wifi-line-1 {
			opacity: 0;
			animation-delay: 0.25s;
		}

		.wifi-pen-icon.animate .wifi-line-2 {
			opacity: 0;
			animation-delay: 0.35s;
		}

		.wifi-pen-icon.animate .wifi-line-3 {
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
		'aria-label': 'wifi-pen',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WifiPenIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
			}
		});
	}
}
