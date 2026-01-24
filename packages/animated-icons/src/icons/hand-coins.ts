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
	selector: 'i-hand-coins',
	template: `
		<svg
			class="hand-coins-icon"
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
			<svg:path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
			<svg:path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
			<svg:path d="m2 16 6 6" />
			<svg:circle class="first-circle" cx="16" cy="9" r="2.9" />
			<svg:circle class="second-circle" cx="6" cy="5" r="3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.hand-coins-icon {
			overflow: visible;
		}

		.first-circle,
		.second-circle {
			opacity: 1;
		}

		@keyframes throw {
			0% {
				transform: translateY(0);
				opacity: 1;
			}
			50% {
				transform: translateY(-10px);
				opacity: 1;
			}
			100% {
				transform: translateY(0);
				opacity: 1;
			}
		}

		.hand-coins-icon.animate .first-circle {
			animation: throw 0.6s ease-in forwards;
			animation-delay: 0s;
		}

		.hand-coins-icon.animate .second-circle {
			animation: throw 0.6s ease-in forwards;
			animation-delay: 0.15s;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'hand-coins',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HandCoinsIcon {
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
			this.#timer = setTimeout(() => this.isAnimating.set(false), 750);
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
