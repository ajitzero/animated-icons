import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-vibrate-off',
	template: `
		<svg
			class="vibrate-off-icon"
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
			<svg:path d="M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2" />
			<svg:path d="M16 10.34V6c0-.55-.45-1-1-1h-4.34" />
			<svg:path d="m2 2 20 20" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.vibrate-off {
			overflow: visible;
		}

		.vibrate-off {
			overflow: visible;
			transform: translateX(0);
			transition: transform 0.6s ease-in-out;
		}

		.vibrate-off.animate {
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
		'aria-label': 'vibrate-off',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VibrateOffIcon {
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
