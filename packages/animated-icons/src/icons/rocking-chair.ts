import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-rocking-chair',
	template: `
		<svg
			class="rocking-chair-icon"
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
			<svg:polyline points="3.5 2 6.5 12.5 18 12.5" />
			<svg:line x1="9.5" x2="5.5" y1="12.5" y2="20" />
			<svg:line x1="15" x2="18.5" y1="12.5" y2="20" />
			<svg:path d="M2.75 18a13 13 0 0 0 18.5 0" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.rocking-chair-icon {
			overflow: visible;
			transform-origin: bottom;
			transition: transform 0.3s ease-in-out;
		}

		.rocking-chair-icon.animate {
			animation: rockingChair 2.4s ease-in-out;
		}

		@keyframes rockingChair {
			0% {
				transform: rotate(0deg);
			}
			20% {
				transform: rotate(-5deg);
			}
			40% {
				transform: rotate(5deg);
			}
			60% {
				transform: rotate(-5deg);
			}
			80% {
				transform: rotate(5deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'rocking-chair',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RockingChairIcon {
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
