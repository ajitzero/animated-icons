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
	selector: 'i-chart-scatter',
	template: `
		<svg
			class="chart-scatter-icon"
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
			@for (dot of dots; track $index) {
				<svg:circle
					class="dot"
					[attr.cx]="dot.cx"
					[attr.cy]="dot.cy"
					[attr.fill]="color()"
					[style.--chart-scatter-delay.s]="dot.delay"
					r="0.5"
				/>
			}
			<svg:path d="M3 3v16a2 2 0 0 0 2 2h16" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chart-scatter-icon {
			overflow: visible;
		}

		.dot {
			opacity: 1;
			transform: scale(1);
			transition: opacity 0.2s;
		}

		.chart-scatter-icon.animate .dot {
			opacity: 0;
			animation: popIn 0.3s ease-out forwards;
			animation-delay: var(--chart-scatter-delay);
		}

		@keyframes popIn {
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
		'aria-label': 'chart-scatter',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartScatterIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input<number, NumberInput>(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input<number, NumberInput>(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	#timer: ReturnType<typeof setTimeout> | null = null;

	protected readonly dots = [
		{ cx: 7.5, cy: 7.5, delay: 2 * 0.15 },
		{ cx: 18.5, cy: 5.5, delay: 5 * 0.15 },
		{ cx: 11.5, cy: 11.5, delay: 3 * 0.15 },
		{ cx: 7.5, cy: 16.5, delay: 1 * 0.15 },
		{ cx: 17.5, cy: 14.5, delay: 4 * 0.15 },
	];

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			this.#timer = setTimeout(() => this.isAnimating.set(false), 900);
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
