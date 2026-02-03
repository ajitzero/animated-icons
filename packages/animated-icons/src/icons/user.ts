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
	selector: 'i-user',
	template: `
		<svg
			class="user-icon"
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
			<svg:path class="user-path" d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<svg:circle class="user-circle" cx="12" cy="7" r="4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.user-path,
		.user-circle {
			transition: transform 0.6s ease-in-out;
		}

		.user-icon.animate .user-path {
			animation: pathBounce 0.6s ease-in-out;
		}

		.user-icon.animate .user-circle {
			animation: circleBounce 0.6s ease-in-out;
		}

		@keyframes pathBounce {
			0% {
				transform: translateY(0);
			}
			33% {
				transform: translateY(2px);
			}
			66% {
				transform: translateY(-2px);
			}
			100% {
				transform: translateY(0);
			}
		}

		@keyframes circleBounce {
			0% {
				transform: translateY(0);
			}
			33% {
				transform: translateY(4px);
			}
			66% {
				transform: translateY(-2px);
			}
			100% {
				transform: translateY(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'user',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIcon {
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
