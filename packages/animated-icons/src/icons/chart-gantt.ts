import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-chart-gantt',
	template: `
		<svg
			class="chart-gantt-icon"
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
			<svg:path class="line line-0" d="M10 6h8" />
			<svg:path class="line line-1" d="M8 11h7" />
			<svg:path class="line line-2" d="M12 16h6" />
			<svg:path class="frame" d="M3 3v16a2 2 0 0 0 2 2h16" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chart-gantt-icon {
			overflow: visible;
		}

		.line {
			stroke-dasharray: 10;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.3s ease,
				opacity 0.3s ease;
		}

		.chart-gantt-icon.animate .line {
			animation: lineAnimation 0.6s ease forwards;
		}

		.chart-gantt-icon.animate .line-0 {
			animation-delay: 0s;
		}

		.chart-gantt-icon.animate .line-1 {
			animation-delay: 0.1s;
		}

		.chart-gantt-icon.animate .line-2 {
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
		'aria-label': 'chart-gantt',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartGanttIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}
}
