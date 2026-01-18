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
	selector: 'i-circle-arrow-out-down-right',
	template: `
		<svg
			class="circle-arrow-out-down-right-icon"
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
			<svg:path d="M12 22a10 10 0 1 1 10-10" />
			<svg:g class="arrow">
				<svg:path d="M22 22 12 12" />
				<svg:path d="M22 16v6h-6" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.arrow path {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
		.animate {
			animation: moveDownRight 0.5s;
		}
		@keyframes moveDownRight {
			0%,
			100% {
				transform: translate(0, 0);
			}
			50% {
				transform: translate(-2px, -2px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'circle-arrow-out-down-right',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleArrowOutDownRightIcon {
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
