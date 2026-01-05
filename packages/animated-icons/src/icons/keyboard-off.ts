import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-keyboard-off',
	template: `
		<svg
			class="keyboard-off-icon"
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
			<svg:path d="M 20 4 A2 2 0 0 1 22 6" />
			<svg:path d="M 22 6 L 22 16.41" />
			<svg:path d="M 7 16 L 16 16" />
			<svg:path d="M 9.69 4 L 20 4" />
			<svg:path d="M14 8h.01" />
			<svg:path d="M18 8h.01" />
			<svg:path d="m2 2 20 20" />
			<svg:path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" />
			<svg:path d="M6 8h.01" />
			<svg:path d="M8 12h.01" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.keyboard-off {
			overflow: visible;
		}

		.keyboard-off {
			overflow: visible;
			transform: translateX(0);
			transition: transform 0.6s ease-in-out;
		}

		.keyboard-off.animate {
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
		'aria-label': 'keyboard-off',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardOffIcon {
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
