import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	linkedSignal,
	numberAttribute,
} from '@angular/core';
import { ANIMATED_ICONS_CONFIG } from '../tokens/provider';

@Component({
	selector: 'i-gallery-thumbnails',
	template: `
		<svg
			class="gallery-thumbnails-icon"
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
			<svg:rect width="18" height="14" x="3" y="3" rx="2" />
			@for (thumb of thumbs; track thumb; let index = $index) {
				<svg:path class="thumbnail-line" [attr.d]="thumb" [style.--gallery-thumbnails-delay]="index + 1" />
			}
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.gallery-thumbnails-icon {
			overflow: visible;
		}

		.thumbnail-line {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.gallery-thumbnails-icon.animate .thumbnail-line {
			opacity: 0;
			animation: fadeInSequence 0.3s ease forwards;
			animation-delay: calc(0.1s + var(--gallery-thumbnails-delay) * 0.09s);
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
		'aria-label': 'gallery-thumbnails',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryThumbnailsIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	#timer: ReturnType<typeof setTimeout> | null = null;

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			this.#timer = setTimeout(() => this.isAnimating.set(false), 850);
		}
	}

	protected thumbs = ['M4 21h1', 'M9 21h1', 'M14 21h1', 'M19 21h1'];

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
			} else {
				if (this.#timer) {
					clearTimeout(this.#timer);
					this.#timer = null;
				}
			}
		});
	}
}
