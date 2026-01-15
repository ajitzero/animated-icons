import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-waves',
	template: `
		<svg
			class="waves-icon"
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
			<svg:path
				class="wave wave-1"
				d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
			/>
			<svg:path
				class="wave wave-2"
				d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
			/>
			<svg:path
				class="wave wave-3"
				d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.wave {
			fill: none;
			stroke-dasharray: 23;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.4s ease-in-out;
		}

		.animate .wave-1 {
			animation: draw 1s ease-in-out forwards;
		}

		.animate .wave-2 {
			animation: draw 1s ease-in-out forwards;
		}

		.animate .wave-3 {
			animation: draw 1s ease-in-out forwards;
		}

		@keyframes draw {
			0%,
			10% {
				stroke-dashoffset: 23;
			}
			100% {
				stroke-dashoffset: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'waves',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WavesIcon {
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
