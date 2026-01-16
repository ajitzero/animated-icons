import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-gallery-horizontal-end',
	template: `
		<svg
			class="gallery-horizontal-end-icon"
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
			<svg:path d="M2 7v10" custom="1" />
			<svg:path d="M6 5v14" custom="2" />
			<svg:rect width="12" height="18" x="10" y="3" rx="2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		path {
			transition:
				transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
				opacity 0.3s ease;
			transform-origin: center;
			opacity: 1;
			transform: translateX(0);
		}

		path[custom='1'].animate {
			animation: disappearThenAppear1 0.6s forwards;
		}

		path[custom='2'].animate {
			animation: disappearThenAppear2 0.6s forwards;
		}

		@keyframes disappearThenAppear1 {
			0% {
				opacity: 0;
				transform: translateX(3px);
			}
			60% {
				opacity: 0;
				transform: translateX(3px);
			}
			80% {
				opacity: 1;
				transform: translateX(0);
			}
			100% {
				opacity: 1;
				transform: translateX(0);
			}
		}

		@keyframes disappearThenAppear2 {
			0% {
				opacity: 0;
				transform: translateX(3px);
			}
			40% {
				opacity: 0;
				transform: translateX(3px);
			}
			60% {
				opacity: 1;
				transform: translateX(0);
			}
			100% {
				opacity: 1;
				transform: translateX(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'gallery-horizontal-end',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryHorizontalEndIcon {
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
