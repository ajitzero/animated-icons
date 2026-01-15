import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-message-circle-more',
	template: `
		<svg
			class="message-circle-more-icon"
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
			<svg:path class="dot dot1" d="M8 12h.01" />
			<svg:path class="dot dot2" d="M12 12h.01" />
			<svg:path class="dot dot3" d="M16 12h.01" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.message-circle-more-icon {
			overflow: visible;
		}

		.dot {
			opacity: 1;
			transition: opacity 0.1s ease;
		}

		.message-circle-more-icon.animate .dot {
			animation: dotAnimation 1.5s infinite;
		}

		.message-circle-more-icon.animate .dot1 {
			animation-delay: 0s;
		}

		.message-circle-more-icon.animate .dot2 {
			animation-delay: 0.1s;
		}

		.message-circle-more-icon.animate .dot3 {
			animation-delay: 0.2s;
		}

		@keyframes dotAnimation {
			0%,
			100% {
				opacity: 1;
			}
			10%,
			20% {
				opacity: 0;
			}
			30%,
			50% {
				opacity: 1;
			}
			60%,
			70% {
				opacity: 0;
			}
			80%,
			90% {
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'message-circle-more',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageCircleMoreIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
