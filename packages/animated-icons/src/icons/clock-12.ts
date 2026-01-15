import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-clock-12',
	template: `
		<svg
			class="clock-12-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:circle cx="12" cy="12" r="10" />
			<svg:line class="minute-hand" [class.animate]="isAnimating()" x1="12" y1="6" x2="12" y2="12" />
			<svg:line class="hour-hand" [class.animate]="isAnimating()" x1="12" y1="12" x2="12" y2="8" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.minute-hand,
		.hour-hand {
			transform-origin: center;
			transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.hour-hand {
			transition-duration: 0.5s;
			transition-timing-function: ease-in-out;
		}

		.minute-hand.animate {
			transform: rotate(360deg);
		}

		.hour-hand.animate {
			transform: rotate(30deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'clock-12',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Clock12Icon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
