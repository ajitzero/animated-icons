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
	selector: 'i-scan-text',
	template: `
		<svg
			class="scan-text-icon"
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
			<svg:path class="frame" d="M3 7V5a2 2 0 0 1 2-2h2" />
			<svg:path class="frame" d="M17 3h2a2 2 0 0 1 2 2v2" />
			<svg:path class="frame" d="M21 17v2a2 2 0 0 1-2 2h-2" />
			<svg:path class="frame" d="M7 21H5a2 2 0 0 1-2-2v-2" />
			<svg:path class="line line-0" d="M7 8h8" />
			<svg:path class="line line-1" d="M7 12h10" />
			<svg:path class="line line-2" d="M7 16h6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.scan-text-icon {
			overflow: visible;
		}

		.line {
			stroke-dasharray: 12;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.3s ease,
				opacity 0.3s ease;
		}

		.scan-text-icon.animate .line {
			animation: lineAnimation 0.6s ease forwards;
		}

		.scan-text-icon.animate .line-0 {
			animation-delay: 0s;
		}

		.scan-text-icon.animate .line-1 {
			animation-delay: 0.1s;
		}

		.scan-text-icon.animate .line-2 {
			animation-delay: 0.2s;
		}

		@keyframes lineAnimation {
			0% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
			50% {
				stroke-dashoffset: 12;
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
		'aria-label': 'scan-text',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanTextIcon {
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
			this.#timer = setTimeout(() => this.isAnimating.set(false), 700);
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
