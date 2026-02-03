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
	selector: 'i-grip-horizontal',
	template: `
		<svg
			class="grip-horizontal-icon"
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
			@for (circle of circles; track $index) {
				<svg:circle
					class="grip-circle"
					[attr.cx]="circle.cx"
					[attr.cy]="circle.cy"
					[style.--grip-horizontal-delay.s]="circle.delay"
					r="1"
				/>
			}
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.grip-horizontal-icon {
			overflow: visible;
		}

		.grip-circle {
			opacity: 1;
		}

		.grip-horizontal-icon.animate .grip-circle {
			animation: fadeInOut 0.8s ease-in forwards;
			animation-delay: var(--grip-horizontal-delay);
		}

		@keyframes fadeInOut {
			0%,
			100% {
				opacity: 1;
			}
			50% {
				opacity: 0.3;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'grip-horizontal',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GripHorizontalIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	#timer: ReturnType<typeof setTimeout> | null = null;

	protected readonly circles = [
		{ cx: 12, cy: 9, delay: 0 }, // Center top
		{ cx: 19, cy: 9, delay: 0.05 }, // Right top
		{ cx: 5, cy: 9, delay: 0.1 }, // Left top
		{ cx: 12, cy: 15, delay: 0.15 }, // Center bottom
		{ cx: 19, cy: 15, delay: 0.2 }, // Right bottom
		{ cx: 5, cy: 15, delay: 0.25 }, // Left bottom
	];

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			this.#timer = setTimeout(() => this.isAnimating.set(false), 1600);
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
