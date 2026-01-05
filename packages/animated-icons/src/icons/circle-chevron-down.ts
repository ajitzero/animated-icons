import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-circle-chevron-down',
	template: `
		<svg
			class="circle-chevron-down-icon"
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
			<svg:circle cx="12" cy="12" r="10" />
			<svg:path class="chevron" d="m16 10-4 4-4-4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.circle-chevron-down {
			overflow: visible;
		}

		.chevron {
			transition: transform 0.3s ease-in;
		}

		.circle-chevron-down.animate .chevron {
			animation: bounceChevron 0.3s ease-in;
		}

		@keyframes bounceChevron {
			0%,
			100% {
				transform: translateY(0);
			}
			40% {
				transform: translateY(2px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'circle-chevron-down',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleChevronDownIcon {
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
