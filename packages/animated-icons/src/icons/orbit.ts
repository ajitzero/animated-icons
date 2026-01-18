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
	selector: 'i-orbit',
	template: `
		<svg
			class="orbit-icon"
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
			<svg:circle cx="12" cy="12" r="3" />
			<svg:circle cx="19" cy="5" r="2" />
			<svg:circle cx="5" cy="19" r="2" />
			<svg:path d="M10.4 21.9a10 10 0 0 0 9.941-15.416" />
			<svg:path d="M13.5 2.1a10 10 0 0 0-9.841 15.416" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.orbit-icon {
			transform-origin: center center;
			transition: transform 1s ease-in-out;
		}

		.orbit-icon.animate {
			animation: rotate-path 3s ease-in-out;
		}

		@keyframes rotate-path {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(-1080deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'orbit',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrbitIcon {
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
