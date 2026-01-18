import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-square-chart-gantt',
	template: `
		<svg
			class="square-chart-gantt-icon"
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
			<svg:rect width="18" height="18" x="3" y="3" rx="2" />
			<svg:path class="line line-0" d="M9 8h7" />
			<svg:path class="line line-1" d="M8 12h6" />
			<svg:path class="line line-2" d="M11 16h5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.square-chart-gantt-icon {
			overflow: visible;
		}

		.line {
			stroke-dasharray: 10;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.3s ease,
				opacity 0.3s ease;
		}

		.square-chart-gantt-icon.animate .line {
			animation: lineAnimation 0.6s ease forwards;
		}

		.square-chart-gantt-icon.animate .line-0 {
			animation-delay: 0s;
		}

		.square-chart-gantt-icon.animate .line-1 {
			animation-delay: 0.1s;
		}

		.square-chart-gantt-icon.animate .line-2 {
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
		'aria-label': 'square-chart-gantt',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareChartGanttIcon {
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
