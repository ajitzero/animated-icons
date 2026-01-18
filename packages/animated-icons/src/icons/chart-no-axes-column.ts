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
	selector: 'i-chart-no-axes-column',
	template: `
		<svg
			class="chart-no-axes-column-icon"
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
			<svg:line class="column column-2" x1="18" y1="20" x2="18" y2="10" />
			<svg:line class="column column-1" x1="12" y1="20" x2="12" y2="4" />
			<svg:line class="column column-0" x1="6" y1="20" x2="6" y2="14" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chart-no-axes-column-icon {
			overflow: visible;
		}

		.column {
			stroke-dasharray: 20;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.3s ease,
				opacity 0.3s ease;
		}

		.chart-no-axes-column-icon.animate .column {
			animation: columnAnimation 0.6s ease forwards;
		}

		.chart-no-axes-column-icon.animate .column-0 {
			animation-delay: 0s;
		}

		.chart-no-axes-column-icon.animate .column-1 {
			animation-delay: 0.1s;
		}

		.chart-no-axes-column-icon.animate .column-2 {
			animation-delay: 0.2s;
		}

		@keyframes columnAnimation {
			0% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
			50% {
				stroke-dashoffset: 20;
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
		'aria-label': 'chart-no-axes-column',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartNoAxesColumnIcon {
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
