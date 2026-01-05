import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-vibrate',
	template: `
		<svg
			class="vibrate-icon"
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
			<svg:path d="m2 8 2 2-2 2 2 2-2 2" />
			<svg:path d="m22 8-2 2 2 2-2 2 2 2" />
			<svg:rect class="vibrate-rect" width="8" height="14" x="8" y="5" rx="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.vibrate-rect {
			transform: rotate(0deg);
			transition: transform 0.4s ease;
		}

		.vibrate-rect.animate {
			transform-origin: center;
			animation: vibrate 0.4s ease;
		}

		@keyframes vibrate {
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
		'aria-label': 'vibrate',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VibrateIcon {
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
