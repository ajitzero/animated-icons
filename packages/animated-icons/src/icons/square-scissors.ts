import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-square-scissors',
	template: `
		<svg
			class="square-scissors-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isAnimating()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:rect width="20" height="20" x="2" y="2" rx="2" />
			<svg:g class="blade-top">
				<svg:circle cx="8" cy="8" r="2" />
				<svg:path d="M9.414 9.414 12 12" />
				<svg:path d="M14.8 14.8 18 18" />
			</svg:g>

			<svg:g class="blade-bottom">
				<svg:circle cx="8" cy="16" r="2" />
				<svg:path d="m18 6-8.586 8.586" />
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
		'aria-label': 'square-scissors',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareScissorsIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}
}
