import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-thermometer',
	template: `
		<svg
			class="thermometer-icon"
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
			<svg:path class="thermometer-path" d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.thermometer-icon {
			transform-origin: center;
		}

		.thermometer-icon.animate {
			animation: shake 0.4s ease-in-out;
		}

		@keyframes shake {
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
		'aria-label': 'thermometer',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThermometerIcon {
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
