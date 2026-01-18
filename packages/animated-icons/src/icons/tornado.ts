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
	selector: 'i-tornado',
	template: `
		<svg
			class="tornado-icon"
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
			<svg:path class="line line-1" d="M21 4H3" />
			<svg:path class="line line-2" d="M18 8H6" />
			<svg:path class="line line-3" d="M19 12H9" />
			<svg:path class="line line-4" d="M16 16h-6" />
			<svg:path class="line line-5" d="M11 20H9" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.line {
			transition: transform 0.3s ease;
			transform-origin: center;
		}
		.animate .line-2 {
			animation: swirlLeftRight 3s ease-in-out;
		}
		.animate .line-3 {
			animation: swirlLeftRight 3s ease-in-out;
			animation-delay: 0.1s;
		}
		.animate .line-4 {
			animation: swirlLeftRight 3s ease-in-out;
			animation-delay: 0.2s;
		}
		.animate .line-5 {
			animation: swirlLeftRight 3s ease-in-out;
			animation-delay: 0.3s;
		}

		@keyframes swirlLeftRight {
			0%,
			100% {
				transform: translateX(0);
			}
			10%,
			30%,
			50%,
			70%,
			90% {
				transform: translateX(-2px);
			}
			20%,
			40%,
			60%,
			80% {
				transform: translateX(2px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'tornado',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TornadoIcon {
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
