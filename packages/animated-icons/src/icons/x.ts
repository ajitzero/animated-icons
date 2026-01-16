import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-x',
	template: `
		<svg
			class="x-icon"
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
			<svg:path class="diagonal-1" d="M18 6 6 18" />
			<svg:path class="diagonal-2" d="m6 6 12 12" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.x {
			overflow: visible;
		}

		.diagonal-1,
		.diagonal-2 {
			stroke-dasharray: 17;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.15s ease-out;
		}

		.x.animate .diagonal-1 {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out forwards;
		}

		.x.animate .diagonal-2 {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out 0.25s forwards;
		}

		@keyframes lineAnimation {
			0% {
				opacity: 0;
				stroke-dashoffset: 17;
			}
			15% {
				opacity: 1;
				stroke-dashoffset: 17;
			}
			100% {
				opacity: 1;
				stroke-dashoffset: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'x',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XIcon {
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
