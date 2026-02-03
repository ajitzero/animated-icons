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
	selector: 'i-cpu',
	template: `
		<svg
			class="cpu-icon"
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
			<svg:rect width="16" height="16" x="4" y="4" rx="2" />
			<svg:rect width="6" height="6" x="9" y="9" rx="1" />
			<svg:path class="vertical-line" d="M15 2v2" />
			<svg:path class="vertical-line" d="M15 20v2" />
			<svg:path class="horizontal-line" d="M2 15h2" />
			<svg:path class="horizontal-line" d="M2 9h2" />
			<svg:path class="horizontal-line" d="M20 15h2" />
			<svg:path class="horizontal-line" d="M20 9h2" />
			<svg:path class="vertical-line" d="M9 2v2" />
			<svg:path class="vertical-line" d="M9 20v2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.cpu-icon {
			overflow: visible;
		}

		.vertical-line,
		.horizontal-line {
			transition:
				transform 0.5s ease-in-out,
				opacity 0.5s ease-in-out;
			transform-origin: center;
		}

		.animate .vertical-line {
			animation: scaleYAnimation 0.5s ease-in-out 2;
		}

		.animate .horizontal-line {
			animation: scaleXAnimation 0.5s ease-in-out 2;
		}

		@keyframes scaleYAnimation {
			0% {
				transform: scaleY(1);
				opacity: 1;
			}
			50% {
				transform: scaleY(1.1);
				opacity: 0.8;
			}
			100% {
				transform: scaleY(1);
				opacity: 1;
			}
		}

		@keyframes scaleXAnimation {
			0% {
				transform: scaleX(1);
				opacity: 1;
			}
			50% {
				transform: scaleX(1.1);
				opacity: 0.8;
			}
			100% {
				transform: scaleX(1);
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'cpu',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CpuIcon {
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
