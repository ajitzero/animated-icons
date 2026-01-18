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
	selector: 'i-scissors',
	template: `
		<svg
			class="scissors-icon"
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
			<svg:g class="blade-top">
				<svg:circle cx="6" cy="6" r="3" />
				<svg:path d="M8.12 8.12 12 12" />
				<svg:path d="M14.8 14.8 20 20" />
			</svg:g>
			<svg:g class="blade-bottom">
				<svg:circle cx="6" cy="18" r="3" />
				<svg:path d="M20 4 8.12 15.88" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.scissors-icon .blade-top,
		.scissors-icon .blade-bottom {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			transform-origin: 12px 12px;
		}

		.scissors-icon.animate .blade-top {
			animation: openBlade 0.8s ease-in-out;
		}

		.scissors-icon.animate .blade-bottom {
			animation: closeBlade 0.8s ease-in-out;
		}

		@keyframes openBlade {
			0%,
			50%,
			100% {
				transform: rotate(0);
			}
			25%,
			75% {
				transform: rotate(-20deg);
			}
		}

		@keyframes closeBlade {
			0%,
			50%,
			100% {
				transform: rotate(0);
			}
			25%,
			75% {
				transform: rotate(20deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'scissors',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScissorsIcon {
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
			setTimeout(() => this.isAnimating.set(false), 800);
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
