import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-circle-alert',
	template: `
		<svg
			class="circle-alert-icon"
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
			<svg:circle cx="12" cy="12" r="10" />
			<svg:g [class.animate-path]="isAnimating()">
				<svg:line x1="12" x2="12" y1="8" y2="12" />
				<svg:line x1="12" x2="12.01" y1="16" y2="16" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.animate-icon {
			animation: primaryAnimation 0.5s ease-in-out;
		}

		@keyframes primaryAnimation {
			0% {
				transform: scale(1) rotate(0deg);
			}
			20% {
				transform: scale(1.1) rotate(-3deg);
			}
			40% {
				transform: scale(1.1) rotate(3deg);
			}
			60% {
				transform: scale(1.1) rotate(-2deg);
			}
			100% {
				transform: scale(1) rotate(0deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'circle-alert',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleAlertIcon {
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
