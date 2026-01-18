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
	selector: 'i-shield-plus',
	template: `
		<svg
			class="shield-plus-icon"
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
			<svg:path
				class="shield"
				d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
			/>
			<svg:path class="horizontal" d="M9 12h6" />
			<svg:path class="vertical" d="M12 9v6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.shield-plus-icon {
			overflow: visible;
		}

		.shield-plus-icon .horizontal,
		.shield-plus-icon .vertical {
			stroke-dasharray: 8;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.15s ease-out;
		}

		.shield-plus-icon.animate .horizontal {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out forwards;
		}

		.shield-plus-icon.animate .vertical {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out 0.25s forwards;
		}

		@keyframes lineAnimation {
			0% {
				opacity: 0;
				stroke-dashoffset: 8;
			}
			15% {
				opacity: 1;
				stroke-dashoffset: 8;
			}
			100% {
				opacity: 1;
				stroke-dashoffset: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'shield-plus',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShieldPlusIcon {
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
			setTimeout(() => this.isAnimating.set(false), 500);
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
