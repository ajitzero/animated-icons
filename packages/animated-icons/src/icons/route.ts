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
	selector: 'i-route',
	template: `
		<svg
			class="route-icon"
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
			<svg:circle class="circle-1" cx="6" cy="19" r="3" />
			<svg:circle class="circle-2" cx="18" cy="5" r="3" />
			<svg:path class="line" d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.line {
			stroke-dasharray: 50;
			stroke-dashoffset: 0;
		}

		.route-icon.animate .circle-1 {
			animation: circle1Animation 0.4s ease-out forwards;
		}

		.route-icon.animate .circle-2 {
			animation: circle2Animation 0.4s ease-out forwards;
		}

		.route-icon.animate .line {
			animation: lineAnimation 0.8s forwards;
		}

		@keyframes circle1Animation {
			0%,
			50% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}

		@keyframes circle2Animation {
			0%,
			50% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}

		@keyframes lineAnimation {
			0%,
			50% {
				stroke-dashoffset: 50;
			}
			15% {
				stroke-dashoffset: 50;
			}
			100% {
				stroke-dashoffset: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'route',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteIcon {
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
