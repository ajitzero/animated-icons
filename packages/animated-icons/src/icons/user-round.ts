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
	selector: 'i-user-round',
	template: `
		<svg
			class="user-round-icon"
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
			<svg:path class="user-round-path" d="M20 21a8 8 0 0 0-16 0" />
			<svg:circle class="user-round-circle" cx="12" cy="8" r="5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.user-round-path,
		.user-round-circle {
			transition: transform 0.6s ease-in-out;
		}

		.user-round-icon.animate .user-round-path {
			animation: pathBounce 0.6s ease-in-out;
		}

		.user-round-icon.animate .user-round-circle {
			animation: circleBounce 0.6s ease-in-out;
		}

		@keyframes pathBounce {
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

		@keyframes circleBounce {
			0% {
				transform: translateY(0);
			}
			33% {
				transform: translateY(1px);
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
		'aria-label': 'user-round',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRoundIcon {
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
