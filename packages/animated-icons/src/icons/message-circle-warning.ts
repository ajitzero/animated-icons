import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-message-circle-warning',
	template: `
		<svg
			class="message-circle-warning-icon"
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
			<svg:path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
			<svg:path d="M12 8v4" />
			<svg:path d="M12 16h.01" />
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
		'aria-label': 'message-circle-warning',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageCircleWarningIcon {
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
