import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-gavel',
	template: `
		<svg
			class="gavel-icon"
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
			<svg:path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" />
			<svg:path d="m16 16 6-6" />
			<svg:path d="m8 8 6-6" />
			<svg:path d="m9 7 8 8" />
			<svg:path d="m21 11-8-8" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.gavel-icon {
			transform-origin: bottom left;
			transition: transform 0.3s ease;
		}

		.gavel-icon.animate {
			animation: swing 1s ease;
		}

		@keyframes swing {
			0% {
				transform: rotate(0deg);
			}
			60% {
				transform: rotate(-20deg);
			}
			80% {
				transform: rotate(15deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'gavel',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GavelIcon {
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
