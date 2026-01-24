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
	selector: 'i-clipboard-list',
	template: `
		<svg
			class="clipboard-list-icon"
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
			<svg:rect class="clip" width="8" height="4" x="8" y="2" rx="1" ry="1" />
			<svg:path class="board" d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
			<svg:path class="list-item-1 list-item" d="M12 11h4" />
			<svg:path class="list-item-2 list-item" d="M12 16h4" />
			<svg:path class="bullet bullet-1" d="M8 11h.01" />
			<svg:path class="bullet bullet-2" d="M8 16h.01" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.clipboard-list-icon {
			overflow: visible;
		}

		.clip,
		.board {
			transition: transform 0.3s ease;
		}

		.list-item {
			opacity: 1;
			transition: opacity 0.3s ease;
		}

		.bullet {
			opacity: 1;
			transition: opacity 0.3s ease;
			transform-origin: center;
		}

		.clipboard-list-icon.animate .list-item,
		.clipboard-list-icon.animate .bullet {
			opacity: 0;
		}

		.clipboard-list-icon.animate .clip {
			animation: clipBounce 0.5s ease-in-out;
		}

		.clipboard-list-icon.animate .board {
			animation: boardShake 0.5s ease-in-out;
		}

		.clipboard-list-icon.animate .list-item-1 {
			animation: lineFadeIn 0.2s ease-out forwards;
			animation-delay: 0.15s;
		}

		.clipboard-list-icon.animate .bullet-1 {
			animation: bulletFadeIn 0.2s ease-out forwards;
			animation-delay: 0.2s;
		}

		.clipboard-list-icon.animate .list-item-2 {
			animation: lineFadeIn 0.2s ease-out forwards;
			animation-delay: 0.3s;
		}

		.clipboard-list-icon.animate .bullet-2 {
			animation: bulletFadeIn 0.2s ease-out forwards;
			animation-delay: 0.35s;
		}

		@keyframes clipBounce {
			0% {
				transform: translateY(0);
			}
			25% {
				transform: translateY(-2px);
			}
			50% {
				transform: translateY(1px);
			}
			100% {
				transform: translateY(0);
			}
		}

		@keyframes boardShake {
			0% {
				transform: rotate(0deg);
			}
			25% {
				transform: rotate(-1deg);
			}
			75% {
				transform: rotate(1deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}

		@keyframes bulletFadeIn {
			from {
				opacity: 0;
				transform: translateX(-6px) scale(0.8);
			}
			to {
				opacity: 1;
				transform: translateX(0) scale(1);
			}
		}

		@keyframes lineFadeIn {
			from {
				opacity: 0;
				transform: translateX(-8px);
			}
			to {
				opacity: 1;
				transform: translateX(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'clipboard-list',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardListIcon {
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
