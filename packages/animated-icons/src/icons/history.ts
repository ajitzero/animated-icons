import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-history',
	template: `
		<svg
			class="history-icon"
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
			<svg:g class="arrow">
				<svg:path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
				<svg:path d="M3 3v5h5" />
			</svg:g>
			<svg:line class="hour-hand" x1="12" y1="12" x2="12" y2="7" />
			<svg:line class="minute-hand" x1="12" y1="12" x2="16" y2="14" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.arrow {
			transform-origin: center;
			transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.arrow.animate {
			transform: rotate(-50deg);
		}

		.hour-hand {
			transform-origin: 50% 50%;
			transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.hour-hand.animate {
			transform: rotate(-360deg);
		}

		.minute-hand {
			transform-origin: 50% 50%;
			transition: transform 0.5s ease-in-out;
		}

		.minute-hand.animate {
			transform: rotate(-45deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'history',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
