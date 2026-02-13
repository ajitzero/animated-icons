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
	selector: 'i-clipboard-x',
	template: `
		<svg
			class="clipboard-x-icon"
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
			<svg:path class="diagonal-1" d="m15 11-6 6" />
			<svg:path class="diagonal-2" d="m9 11 6 6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.clipboard-x-icon {
			overflow: visible;
		}

		.clip,
		.board {
			transition: transform 0.3s ease;
		}

		.diagonal-1,
		.diagonal-2 {
			stroke-dasharray: 8.5;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.15s ease-out;
		}

		.clipboard-x-icon.animate .clip {
			animation: clipBounce 0.5s ease-in-out;
		}

		.clipboard-x-icon.animate .board {
			animation: boardShake 0.5s ease-in-out;
		}

		.clipboard-x-icon.animate .diagonal-1 {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out forwards;
		}

		.clipboard-x-icon.animate .diagonal-2 {
			opacity: 0;
			animation: lineAnimation 0.3s ease-out 0.25s forwards;
		}

		@keyframes lineAnimation {
			0% {
				opacity: 0;
				stroke-dashoffset: 8.5;
			}
			15% {
				opacity: 1;
				stroke-dashoffset: 8.5;
			}
			100% {
				opacity: 1;
				stroke-dashoffset: 0;
			}
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
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'clipboard-x',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardXIcon {
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
			this.#timer = setTimeout(() => this.isAnimating.set(false), 600);
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
