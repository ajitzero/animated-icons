import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-message-square-more',
	template: `
		<svg
			class="message-square-more-icon"
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
			<svg:path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
			<svg:path class="dot dot1" d="M8 10h.01" />
			<svg:path class="dot dot2" d="M12 10h.01" />
			<svg:path class="dot dot3" d="M16 10h.01" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.message-square-more-icon {
			overflow: visible;
		}

		.dot {
			opacity: 1;
			transition: opacity 0.1s ease;
		}

		.message-square-more-icon.animate .dot {
			animation: dotAnimation 1.5s infinite;
		}

		.message-square-more-icon.animate .dot1 {
			animation-delay: 0s;
		}

		.message-square-more-icon.animate .dot2 {
			animation-delay: 0.1s;
		}

		.message-square-more-icon.animate .dot3 {
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
		'aria-label': 'message-square-more',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageSquareMoreIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');

	isHovered = signal(false);

	handleMouseEnter() {
		this.isHovered.set(true);
	}

	handleMouseLeave() {
		this.isHovered.set(false);
	}
}
