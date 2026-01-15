import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-gallery-vertical',
	template: `
		<svg
			class="gallery-vertical-icon"
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
			<svg:path class="gallery-path gallery-path-1" d="M3 2h18" />
			<svg:rect class="gallery-rect" width="18" height="12" x="3" y="6" rx="2" />
			<svg:path class="gallery-path gallery-path-2" d="M3 22h18" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.gallery-vertical-icon {
			overflow: visible;
		}

		.gallery-path {
			opacity: 1;
			transform: scale(1) translateY(0);
			transform-origin: center;
		}

		.gallery-rect {
			opacity: 1;
			transform: scale(1);
			transform-origin: center;
		}

		.gallery-vertical-icon.animate .gallery-path-1 {
			animation: slideInTop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
		}

		.gallery-vertical-icon.animate .gallery-path-2 {
			animation: slideInBottom 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
		}

		@keyframes slideInTop {
			0% {
				opacity: 0;
				transform: scale(0.8) translateY(4px);
			}
			100% {
				opacity: 1;
				transform: scale(1) translateY(0);
			}
		}

		@keyframes slideInBottom {
			0% {
				opacity: 0;
				transform: scale(0.8) translateY(-4px);
			}
			100% {
				opacity: 1;
				transform: scale(1) translateY(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'gallery-vertical',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryVerticalIcon {
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
