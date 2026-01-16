import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-signal-low',
	template: `
		<svg
			class="signal-low-icon"
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
			<svg:path d="M2 20h.01" />
			<svg:path class="signal-level signal-line-1" d="M7 20v-4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.signal-icon {
			overflow: visible;
		}

		.signal-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.signal-icon.animate .signal-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.signal-icon.animate .signal-line-1 {
			opacity: 0;
			animation-delay: 0.25s;
		}

		@keyframes fadeInSequence {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'signal-low',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalLowIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || !this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
			}
		});
	}
}
