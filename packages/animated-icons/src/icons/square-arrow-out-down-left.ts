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
	selector: 'i-square-arrow-out-down-left',
	template: `
		<svg
			class="square-arrow-out-down-left-icon"
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
			<svg:path d="M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6" />
			<svg:g class="arrow">
				<svg:path d="m3 21 9-9" />
				<svg:path d="M9 21H3v-6" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.arrow {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
		.arrow.animate {
			animation: moveDownLeft 0.5s;
		}
		@keyframes moveDownLeft {
			0%,
			100% {
				transform: translate(0, 0);
			}
			50% {
				transform: translate(2px, -2px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'square-arrow-out-down-left',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareArrowOutDownLeftIcon {
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
