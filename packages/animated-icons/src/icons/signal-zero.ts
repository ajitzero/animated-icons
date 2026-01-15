import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-signal-zero',
	template: `
		<svg
			class="signal-zero-icon"
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
			<svg:path class="signal-level" d="M2 20h.01" />
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
			transition: opacity 0.2s ease;
		}

		.signal-icon.animate .signal-level {
			opacity: 0;
			animation: fadeInSequence 1.2s;
		}

		@keyframes fadeInSequence {
			0% {
				opacity: 1;
			}
			17% {
				opacity: 0;
			}
			33% {
				opacity: 1;
			}
			50% {
				opacity: 0;
			}
			67% {
				opacity: 1;
			}
			83% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'signal-zero',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalZeroIcon {
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
