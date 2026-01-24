import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
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
	selector: 'i-smartphone-nfc',
	template: `
		<svg
			class="smartphone-nfc-icon"
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
			<svg:rect width="7" height="12" x="2" y="6" rx="1" />
			<svg:path class="nfc-level nfc-line-1" d="M13 8.32a7.43 7.43 0 0 1 0 7.36" />
			<svg:path class="nfc-level nfc-line-2" d="M16.46 6.21a11.76 11.76 0 0 1 0 11.58" />
			<svg:path class="nfc-level nfc-line-3" d="M19.91 4.1a15.91 15.91 0 0 1 .01 15.8" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.smartphone-nfc-icon {
			overflow: visible;
		}

		.nfc-level {
			opacity: 1;
			transition: opacity 0.2s ease;
		}

		.smartphone-nfc-icon.animate .nfc-level {
			animation: fadeInSequence 0.6s ease forwards;
		}

		.smartphone-nfc-icon.animate .nfc-line-1 {
			opacity: 0;
			animation-delay: 0.25s;
		}

		.smartphone-nfc-icon.animate .nfc-line-2 {
			opacity: 0;
			animation-delay: 0.35s;
		}

		.smartphone-nfc-icon.animate .nfc-line-3 {
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
		'aria-label': 'smartphone-nfc',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartphoneNfcIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input<number, NumberInput>(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input<number, NumberInput>(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	#timer: ReturnType<typeof setTimeout> | null = null;

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			this.#timer = setTimeout(() => this.isAnimating.set(false), 1400);
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
