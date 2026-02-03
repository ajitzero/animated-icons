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
	selector: 'i-axis-3d',
	template: `
		<svg
			class="axis-3d-icon"
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
			<svg:path class="axis-3d-path1" d="M4 4v15a1 1 0 0 0 1 1h15" />
			<svg:g class="axis-3d-group">
				<svg:path class="axis-3d-path2" d="M4.293 19.707 6 18" />
				<svg:path class="axis-3d-path3" d="m9 15 1.5-1.5" />
				<svg:path class="axis-3d-path4" d="M13.5 10.5 15 9" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.axis-3d-icon {
			overflow: visible;
		}

		.axis-3d-path2,
		.axis-3d-path3,
		.axis-3d-path4 {
			stroke-dasharray: 10;
			stroke-dashoffset: 0;
			opacity: 1;
			transition:
				stroke-dashoffset 0.1s ease-in-out,
				opacity 0.1s ease-in-out;
		}

		.axis-3d-icon.animate .axis-3d-path2 {
			opacity: 0;
			stroke-dashoffset: 10;
			animation: drawPath2 0.3s ease-in-out 0.2s forwards;
		}

		.axis-3d-icon.animate .axis-3d-path3 {
			opacity: 0;
			stroke-dashoffset: 10;
			animation: drawPath3 0.3s ease-in-out 0.4s forwards;
		}

		.axis-3d-icon.animate .axis-3d-path4 {
			opacity: 0;
			stroke-dashoffset: 10;
			animation: drawPath4 0.3s ease-in-out 0.6s forwards;
		}

		@keyframes drawPath2 {
			0% {
				stroke-dashoffset: 10;
				opacity: 0;
			}
			100% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
		}

		@keyframes drawPath3 {
			0% {
				stroke-dashoffset: 10;
				opacity: 0;
			}
			100% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
		}

		@keyframes drawPath4 {
			0% {
				stroke-dashoffset: 10;
				opacity: 0;
			}
			100% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'axis-3d',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Axis3dIcon {
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
