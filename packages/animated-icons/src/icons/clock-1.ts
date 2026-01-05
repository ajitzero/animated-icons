import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-clock-1',
	template: `
		<svg
			class="clock-1-icon"
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
			<svg:circle cx="12" cy="12" r="10" />
			<svg:line class="minute-hand" x1="12" y1="6" x2="12" y2="12" />
			<svg:line class="hour-hand" x1="12" y1="12" x2="14.5" y2="8" />
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
		'aria-label': 'clock-1',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Clock1Icon {
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
