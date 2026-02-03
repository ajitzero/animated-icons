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
	selector: 'i-book-open-check',
	template: `
		<svg
			class="book-open-check-icon"
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
			<svg:path d="M12 21V7" />
			<svg:path class="check-path" d="m16 12 2 2 4-4" />
			<svg:path
				d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.book-open-check-icon {
			overflow: visible;
		}
		.check-path {
			stroke-dasharray: 9;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.125s ease-out,
				opacity 0.125s ease-out;
		}
		.book-open-check-icon.animate .check-path {
			animation: checkAnimation 0.5s ease-out backwards;
		}
		@keyframes checkAnimation {
			0% {
				stroke-dashoffset: 9;
				opacity: 0;
			}
			33% {
				stroke-dashoffset: 9;
				opacity: 0;
			}
			100% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'book-open-check',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookOpenCheckIcon {
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
			this.#timer = setTimeout(() => this.isAnimating.set(false), 500);
		}
	}

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
