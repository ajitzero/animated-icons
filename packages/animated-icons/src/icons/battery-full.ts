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
	selector: 'i-battery-full',
	template: `
		<svg
			class="battery-full-icon"
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
			<svg:rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
			<svg:line x1="22" x2="22" y1="11" y2="13" />
			<svg:line class="battery-bar battery-bar-1" x1="6" x2="6" y1="11" y2="13" />
			<svg:line class="battery-bar battery-bar-2" x1="10" x2="10" y1="11" y2="13" />
			<svg:line class="battery-bar battery-bar-3" x1="14" x2="14" y1="11" y2="13" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.battery-full-icon {
			overflow: visible;
		}

		.battery-bar {
			opacity: 1;
			transition: opacity 0.3s ease;
		}

		.battery-full-icon.animate .battery-bar {
			animation: fadeInSequence 0.3s ease forwards;
		}

		.battery-full-icon.animate .battery-bar-1 {
			opacity: 0;
			animation-delay: 0.4s;
		}

		.battery-full-icon.animate .battery-bar-2 {
			opacity: 0;
			animation-delay: 0.8s;
		}

		.battery-full-icon.animate .battery-bar-3 {
			opacity: 0;
			animation-delay: 1.2s;
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
		'aria-label': 'battery-full',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BatteryFullIcon {
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
			this.#timer = setTimeout(() => this.isAnimating.set(false), 1500);
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
