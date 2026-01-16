import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-circle-chevron-up',
	template: `
		<svg
			class="circle-chevron-up-icon"
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
			<svg:circle cx="12" cy="12" r="10" />
			<svg:path class="chevron" d="m8 14 4-4 4 4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.circle-chevron-up {
			overflow: visible;
		}

		.chevron {
			transition: transform 0.3s ease-in;
		}

		.circle-chevron-up.animate .chevron {
			animation: bounceChevron 0.3s ease-in;
		}

		@keyframes bounceChevron {
			0%,
			100% {
				transform: translateY(0);
			}
			40% {
				transform: translateY(-2px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'circle-chevron-up',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleChevronUpIcon {
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
