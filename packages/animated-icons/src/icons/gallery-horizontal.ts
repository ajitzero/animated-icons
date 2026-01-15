import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-gallery-horizontal',
	template: `
		<svg
			class="gallery-horizontal-icon"
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
			<svg:path class="gallery-path gallery-path-1" d="M2 3v18" />
			<svg:rect class="gallery-rect" width="12" height="18" x="6" y="3" rx="2" />
			<svg:path class="gallery-path gallery-path-2" d="M22 3v18" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.gallery-horizontal-icon {
			overflow: visible;
		}

		.gallery-path {
			opacity: 1;
			transform: scale(1) translateX(0);
			transform-origin: center;
		}

		.gallery-rect {
			opacity: 1;
			transform: scale(1);
			transform-origin: center;
		}

		.gallery-horizontal-icon.animate .gallery-path-1 {
			animation: slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
		}

		.gallery-horizontal-icon.animate .gallery-path-2 {
			animation: slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
		}

		@keyframes slideInLeft {
			0% {
				opacity: 0;
				transform: scale(0.8) translateX(4px);
			}
			100% {
				opacity: 1;
				transform: scale(1) translateX(0);
			}
		}

		@keyframes slideInRight {
			0% {
				opacity: 0;
				transform: scale(0.8) translateX(-4px);
			}
			100% {
				opacity: 1;
				transform: scale(1) translateX(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'gallery-horizontal',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryHorizontalIcon {
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
