import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-cast',
	template: `
		<svg
			class="cast-icon"
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
			<svg:path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
			<svg:path class="cast-level cast-line-3" d="M2 12a9 9 0 0 1 8 8" />
			<svg:path class="cast-level cast-line-2" d="M2 16a5 5 0 0 1 4 4" />
			<svg:line class="cast-level cast-line-1" x1="2" x2="2.01" y1="20" y2="20" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.cast-icon {
			overflow: visible;
		}

		.cast-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.cast-icon.animate .cast-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.cast-icon.animate .cast-line-1 {
			opacity: 0;
			animation-delay: 0.25s;
		}

		.cast-icon.animate .cast-line-2 {
			opacity: 0;
			animation-delay: 0.35s;
		}

		.cast-icon.animate .cast-line-3 {
			opacity: 0;
			animation-delay: 0.45s;
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
		'aria-label': 'cast',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CastIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || !this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 700);
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
