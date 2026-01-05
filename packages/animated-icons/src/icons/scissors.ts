import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-scissors',
	template: `
		<svg
			class="scissors-icon"
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
			<svg:g class="blade-top">
				<svg:circle cx="6" cy="6" r="3" />
				<svg:path d="M8.12 8.12 12 12" />
				<svg:path d="M14.8 14.8 20 20" />
			</svg:g>
			<svg:g class="blade-bottom">
				<svg:circle cx="6" cy="18" r="3" />
				<svg:path d="M20 4 8.12 15.88" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.blade-top,
		.blade-bottom {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			transform-origin: 12px 12px;
		}

		.animate .blade-top {
			animation: openBlade 0.8s ease-in-out;
		}

		.animate .blade-bottom {
			animation: closeBlade 0.8s ease-in-out;
		}

		@keyframes openBlade {
			0%,
			50%,
			100% {
				transform: rotate(0);
			}
			25%,
			75% {
				transform: rotate(-20deg);
			}
		}

		@keyframes closeBlade {
			0%,
			50%,
			100% {
				transform: rotate(0);
			}
			25%,
			75% {
				transform: rotate(20deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'scissors',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScissorsIcon {
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
