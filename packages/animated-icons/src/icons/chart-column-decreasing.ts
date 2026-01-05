import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-chart-column-decreasing',
	template: `
		<svg
			class="chart-column-decreasing-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isHovered()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:path class="column column-1" d="M13 17V9" />
			<svg:path class="column column-2" d="M18 17v-3" />
			<svg:path class="frame" d="M3 3v16a2 2 0 0 0 2 2h16" />
			<svg:path class="column column-0" d="M8 17V5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chart-column-decreasing-icon {
			overflow: visible;
		}

		.column {
			stroke-dasharray: 12;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.3s ease,
				opacity 0.3s ease;
		}

		.chart-column-decreasing-icon.animate .column {
			animation: columnAnimation 0.6s ease forwards;
		}

		.chart-column-decreasing-icon.animate .column-0 {
			animation-delay: 0s;
		}

		.chart-column-decreasing-icon.animate .column-1 {
			animation-delay: 0.1s;
		}

		.chart-column-decreasing-icon.animate .column-2 {
			animation-delay: 0.2s;
		}

		@keyframes columnAnimation {
			0% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
			50% {
				stroke-dashoffset: 12;
				opacity: 0;
			}
			51% {
				stroke-dashoffset: 12;
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
		'aria-label': 'chart-column-decreasing',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartColumnDecreasingIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');

	isHovered = signal(false);

	handleMouseEnter() {
		if (!this.isHovered()) {
			this.isHovered.set(true);

			setTimeout(() => {
				this.isHovered.set(false);
			}, 1400);
		}
	}
}
