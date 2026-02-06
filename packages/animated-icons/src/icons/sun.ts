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
	selector: 'i-sun',
	template: `
		<svg
			class="sun-icon"
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
			<svg:circle cx="12" cy="12" r="4" />
			@for (ray of sunRays; track ray; let index = $index) {
				<svg:path class="sun-ray" [attr.d]="ray" [style.--sun-delay]="index + 1" />
			}
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.sun-icon {
			overflow: visible;
		}

		.sun-ray {
			opacity: 1;
			transition: opacity 0.3s ease;
		}

		.sun-icon.animate .sun-ray {
			opacity: 0;
			animation: fadeIn 0.3s ease forwards;
			animation-delay: calc(0.1s + var(--sun-delay) * 0.09s);
		}

		@keyframes fadeIn {
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
		'aria-label': 'sun',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SunIcon {
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
			this.#timer = setTimeout(() => this.isAnimating.set(false), 1100);
		}
	}

	protected sunRays = [
		'M12 2v2',
		'm19.07 4.93-1.41 1.41',
		'M20 12h2',
		'm17.66 17.66 1.41 1.41',
		'M12 20v2',
		'm6.34 17.66-1.41 1.41',
		'M2 12h2',
		'm4.93 4.93 1.41 1.41',
	];

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
