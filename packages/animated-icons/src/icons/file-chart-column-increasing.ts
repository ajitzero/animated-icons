import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-file-chart-column-increasing',
	template: `
		<svg
			class="file-chart-column-increasing-icon"
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
			<svg:path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
			<svg:path d="M14 2v4a2 2 0 0 0 2 2h4" />
			<svg:path class="column column-0" d="M8 18v-2" />
			<svg:path class="column column-1" d="M12 18v-4" />
			<svg:path class="column column-2" d="M16 18v-6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.file-chart-column-increasing-icon {
			overflow: visible;
		}

		.column {
			stroke-dasharray: 20;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.3s ease,
				opacity 0.3s ease;
		}

		.file-chart-column-increasing-icon.animate .column {
			animation: columnAnimation 0.6s ease forwards;
		}

		.file-chart-column-increasing-icon.animate .column-0 {
			animation-delay: 0s;
		}

		.file-chart-column-increasing-icon.animate .column-1 {
			animation-delay: 0.1s;
		}

		.file-chart-column-increasing-icon.animate .column-2 {
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
		'aria-label': 'file-chart-column-increasing',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileChartColumnIncreasingIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || !this.isAnimating()) {
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
