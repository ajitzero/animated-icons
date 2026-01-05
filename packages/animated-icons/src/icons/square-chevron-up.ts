import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-square-chevron-up',
	template: `
		<svg
			class="square-chevron-up-icon"
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
			<svg:rect width="18" height="18" x="3" y="3" rx="2" />
			<svg:path class="chevron" d="m8 14 4-4 4 4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.square-chevron-up {
			overflow: visible;
		}

		.chevron {
			transition: transform 0.3s ease-in;
		}

		.square-chevron-up.animate .chevron {
			animation: bounceChevron 0.3s ease-in;
		}

		@keyframes bounceChevron {
			0%,
			100% {
				transform: translateY(0);
			}
			40% {
				transform: translateY(-2px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'square-chevron-up',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareChevronUpIcon {
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
