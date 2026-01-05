import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-circle-parking-off',
	template: `
		<svg
			class="circle-parking-off-icon"
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
			<svg:path d="m5 5 14 14" />
			<svg:path d="M13 13a3 3 0 1 0 0-6H9v2" />
			<svg:path d="M9 17v-2.34" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.circle-parking-off {
			overflow: visible;
		}

		.circle-parking-off {
			overflow: visible;
			transform: translateX(0);
			transition: transform 0.6s ease-in-out;
		}

		.circle-parking-off.animate {
			animation: groupShake 0.6s ease-in-out;
		}

		@keyframes groupShake {
			0% {
				transform: translateX(0);
			}
			16.67% {
				transform: translateX(-7%);
			}
			33.33% {
				transform: translateX(7%);
			}
			50% {
				transform: translateX(-7%);
			}
			66.67% {
				transform: translateX(7%);
			}
			100% {
				transform: translateX(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'circle-parking-off',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleParkingOffIcon {
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
