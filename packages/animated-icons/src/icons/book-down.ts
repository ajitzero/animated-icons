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
	selector: 'i-book-down',
	template: `
		<svg
			class="book-down-icon"
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
			<svg:path d="M12 13V7" />
			<svg:path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
			<svg:path d="m9 10 3 3 3-3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.book-down-icon {
			overflow: visible;
		}

		.book-down-icon.animate {
			animation: bookAnimation 0.6s ease-in-out;
		}

		@keyframes bookAnimation {
			0% {
				transform: scale(1) rotate(0deg) translateY(0);
			}
			20% {
				transform: scale(1.04) rotate(-8deg) translateY(-2px);
			}
			50% {
				transform: scale(1.04) rotate(8deg) translateY(-2px);
			}
			80% {
				transform: scale(1.04) rotate(-8deg) translateY(-2px);
			}
			100% {
				transform: scale(1) rotate(0deg) translateY(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'book-down',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDownIcon {
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
