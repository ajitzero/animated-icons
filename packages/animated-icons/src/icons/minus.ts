import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-minus',
	template: `
		<svg
			class="minus-icon"
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
			<svg:path class="horizontal" d="M5 12h14" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.minus {
			overflow: visible;
		}

		.horizontal {
			stroke-dasharray: 14;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.15s ease-out;
		}

		.minus.animate .horizontal {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out forwards;
		}

		@keyframes lineAnimation {
			0% {
				opacity: 0;
				stroke-dashoffset: 14;
			}
			15% {
				opacity: 1;
				stroke-dashoffset: 14;
			}
			100% {
				opacity: 1;
				stroke-dashoffset: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'minus',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinusIcon {
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
