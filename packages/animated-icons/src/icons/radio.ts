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
	selector: 'i-radio',
	template: `
		<svg
			class="radio-icon"
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
			<svg:path class="radio-level radio-line-3" d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
			<svg:path class="radio-level radio-line-2" d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
			<svg:circle class="radio-level radio-line-1" cx="12" cy="12" r="2" />
			<svg:path class="radio-level radio-line-2" d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
			<svg:path class="radio-level radio-line-3" d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.radio-icon {
			overflow: visible;
		}

		.radio-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.radio-icon.animate .radio-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.radio-icon.animate .radio-line-1 {
			opacity: 0;
			animation-delay: 0.15s;
		}

		.radio-icon.animate .radio-line-2 {
			opacity: 0;
			animation-delay: 0.25s;
		}

		.radio-icon.animate .radio-line-3 {
			opacity: 0;
			animation-delay: 0.35s;
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
		'aria-label': 'radio',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioIcon {
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
