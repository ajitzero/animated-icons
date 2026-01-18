import type { BooleanInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	linkedSignal,
	numberAttribute,
} from '@angular/core';
import { ANIMATED_ICONS_CONFIG } from '../tokens/provider';

@Component({
	selector: 'i-drum',
	template: `
		<svg
			class="drum-icon"
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
			<svg:path class="drumstick-1" d="m2 2 8 8" />
			<svg:path class="drumstick-2" d="m22 2-8 8" />
			<svg:ellipse cx="12" cy="9" rx="10" ry="5" />
			<svg:path d="M7 13.4v7.9" />
			<svg:path d="M12 14v8" />
			<svg:path d="M17 13.4v7.9" />
			<svg:path d="M2 9v8a10 5 0 0 0 20 0V9" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.drum-icon {
			overflow: visible;
		}

		.drum-icon path {
			transition: transform 0.3s ease;
		}

		.drum-icon.animate .drumstick-1 {
			animation: drumstick1Animation 0.2s ease-in-out infinite alternate;
		}

		.drum-icon.animate .drumstick-2 {
			animation: drumstick2Animation 0.2s ease-in-out infinite alternate;
		}

		@keyframes drumstick1Animation {
			0%,
			100% {
				transform: rotate(0deg);
			}
			50% {
				transform: rotate(-10deg);
			}
		}

		@keyframes drumstick2Animation {
			0%,
			100% {
				transform: rotate(0deg);
			}
			50% {
				transform: rotate(10deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'drum',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrumIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
