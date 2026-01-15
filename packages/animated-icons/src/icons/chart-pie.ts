import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-chart-pie',
	template: `
		<svg
			class="chart-pie-icon"
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
			<svg:path
				class="pie-slice"
				d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
			/>
			<svg:path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.chart-pie-icon {
			overflow: visible;
		}

		.pie-slice {
			transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.5);
		}

		.chart-pie-icon.animate .pie-slice {
			transform: translate(1.1px, -1.1px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'chart-pie',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPieIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
