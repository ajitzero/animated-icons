import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-timer',
	template: `
		<svg
			class="timer-icon"
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
			<svg:line class="button" x1="10" x2="14" y1="2" y2="2" />
			<svg:line class="hand" x1="12" x2="15" y1="14" y2="11" />
			<svg:circle cx="12" cy="14" r="8" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.timer-icon {
			overflow: visible;
		}

		.button {
			transform-origin: center;
			transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.timer-icon.animate .button {
			animation: buttonPress 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.hand {
			transform-origin: 12px 14px;
			transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.timer-icon.animate .hand {
			transform: rotate(300deg);
			transition-delay: 0.1s;
		}

		@keyframes buttonPress {
			0%,
			100% {
				transform: scale(1) translateY(0);
			}
			50% {
				transform: scale(0.9) translateY(0.5px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'timer',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
