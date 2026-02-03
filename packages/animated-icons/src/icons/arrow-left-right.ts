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
	selector: 'i-arrow-left-right',
	template: `
		<svg
			class="arrow-left-right-icon"
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
			<svg:path class="left-arrow" d="M8 3L4 7l4 4" />
			<svg:path class="left-arrow" d="M4 7h16" />
			<svg:path class="right-arrow" d="M16 21l4-4-4-4" />
			<svg:path class="right-arrow" d="M20 17H4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.left-arrow,
		.right-arrow {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.arrow-left-right-icon.animate .left-arrow {
			animation: moveLeft 0.5s;
		}

		.arrow-left-right-icon.animate .right-arrow {
			animation: moveRight 0.5s;
		}

		@keyframes moveLeft {
			0%,
			100% {
				transform: translateX(0);
			}
			50% {
				transform: translateX(-3px);
			}
		}

		@keyframes moveRight {
			0%,
			100% {
				transform: translateX(0);
			}
			50% {
				transform: translateX(3px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'arrow-left-right',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowLeftRightIcon {
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
			this.#timer = setTimeout(() => this.isAnimating.set(false), 500);
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
