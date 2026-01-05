import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-shield-off',
	template: `
		<svg
			class="shield-off-icon"
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
			<svg:path d="m2 2 20 20" />
			<svg:path d="M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71" />
			<svg:path
				d="M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.shield-off {
			overflow: visible;
		}

		.shield-off {
			overflow: visible;
			transform: translateX(0);
			transition: transform 0.6s ease-in-out;
		}

		.shield-off.animate {
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
		'aria-label': 'shield-off',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShieldOffIcon {
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
