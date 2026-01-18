import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-chart-no-axes-gantt',
	template: `
		<svg
			class="chart-no-axes-gantt-icon"
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
			<svg:path class="line line-0" d="M8 6h10" />
			<svg:path class="line line-1" d="M6 12h9" />
			<svg:path class="line line-2" d="M11 18h7" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chart-no-axes-gantt-icon {
			overflow: visible;
		}

		.line {
			stroke-dasharray: 10;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.3s ease,
				opacity 0.3s ease;
		}

		.chart-no-axes-gantt-icon.animate .line {
			animation: lineAnimation 0.6s ease forwards;
		}

		.chart-no-axes-gantt-icon.animate .line-0 {
			animation-delay: 0s;
		}

		.chart-no-axes-gantt-icon.animate .line-1 {
			animation-delay: 0.1s;
		}

		.chart-no-axes-gantt-icon.animate .line-2 {
			animation-delay: 0.2s;
		}

		@keyframes lineAnimation {
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
		'aria-label': 'chart-no-axes-gantt',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartNoAxesGanttIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

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
