import type { BooleanInput } from '@angular/cdk/coercion';
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
	selector: 'i-rss',
	template: `
		<svg
			class="rss-icon"
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
			<svg:path class="rss-level rss-line-2" d="M4 11a9 9 0 0 1 9 9" />
			<svg:path class="rss-level rss-line-3" d="M4 4a16 16 0 0 1 16 16" />
			<svg:circle class="rss-level rss-line-1" cx="5" cy="19" r="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.rss-icon {
			overflow: visible;
		}

		.rss-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.rss-icon.animate .rss-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.rss-icon.animate .rss-line-1 {
			opacity: 0;
			animation-delay: 0.25s;
		}

		.rss-icon.animate .rss-line-2 {
			opacity: 0;
			animation-delay: 0.35s;
		}

		.rss-icon.animate .rss-line-3 {
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
		'aria-label': 'rss',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RssIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
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
