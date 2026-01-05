import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-mic-off',
	template: `
		<svg
			class="mic-off-icon"
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
			<svg:line x1="2" x2="22" y1="2" y2="22" />
			<svg:path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
			<svg:path d="M5 10v2a7 7 0 0 0 12 5" />
			<svg:path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
			<svg:path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
			<svg:line x1="12" x2="12" y1="19" y2="22" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.mic-off {
			overflow: visible;
		}

		.mic-off {
			overflow: visible;
			transform: translateX(0);
			transition: transform 0.6s ease-in-out;
		}

		.mic-off.animate {
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
		'aria-label': 'mic-off',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MicOffIcon {
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
