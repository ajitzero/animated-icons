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
	selector: 'i-square-stack',
	template: `
		<svg
			class="square-stack-icon"
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
			<svg:path class="path-1" d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
			<svg:path class="path-2" d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
			<svg:rect class="rect" width="8" height="8" x="14" y="14" rx="2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.square-stack-icon {
			overflow: visible;
		}

		.path-1,
		.path-2,
		.rect {
			transition: transform 0.4s ease;
			transform-origin: center;
		}

		.square-stack-icon.animate .path-1 {
			animation: scalePath 0.4s ease 0.3s;
		}

		.square-stack-icon.animate .path-2 {
			animation: scalePath 0.4s ease 0.15s;
		}

		.square-stack-icon.animate .rect {
			animation: scaleRect 0.4s ease;
		}

		@keyframes scalePath {
			0%,
			100% {
				transform: scale(1);
			}
			50% {
				transform: scale(0.9);
			}
		}

		@keyframes scaleRect {
			0%,
			100% {
				transform: scale(1);
			}
			50% {
				transform: scale(0.9);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'square-stack',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareStackIcon {
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
