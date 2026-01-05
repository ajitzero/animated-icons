import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-chart-bar',
	template: `
		<svg
			class="chart-bar-icon"
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
			<svg:path class="frame" d="M3 3v16a2 2 0 0 0 2 2h16" />
			<svg:path class="bar bar-2" d="M7 16h8" />
			<svg:path class="bar bar-1" d="M7 11h12" />
			<svg:path class="bar bar-0" d="M7 6h3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chart-bar-icon {
			overflow: visible;
		}

		.bar {
			stroke-dasharray: 12;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.3s ease,
				opacity 0.3s ease;
		}

		.chart-bar-icon.animate .bar {
			animation: barAnimation 0.6s ease forwards;
		}

		.chart-bar-icon.animate .bar-0 {
			animation-delay: 0s;
		}

		.chart-bar-icon.animate .bar-1 {
			animation-delay: 0.1s;
		}

		.chart-bar-icon.animate .bar-2 {
			animation-delay: 0.2s;
		}

		@keyframes barAnimation {
			0% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
			50% {
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
		'aria-label': 'chart-bar',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartBarIcon {
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
