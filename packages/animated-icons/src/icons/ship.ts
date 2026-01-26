import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
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
	selector: 'i-ship',
	template: `
		<svg
			class="ship-icon"
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
			<svg:path
				class="wave"
				d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
			/>
			<svg:g class="ship-body">
				<svg:path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
				<svg:path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
				<svg:path d="M12 10v4" />
				<svg:path d="M12 2v3" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.ship-icon {
			overflow: visible;
		}

		.wave {
			stroke-dasharray: 30;
			transition: stroke-dashoffset 0.6s ease-in-out;
			opacity: 1;
		}

		.ship-icon.animate .wave {
			animation: wave 0.6s ease-in-out;
		}

		.ship-body {
			transform-origin: center;
			transition: transform 1.2s ease-in-out;
		}

		.ship-icon.animate .ship-body {
			animation: rockShip 2.4s ease-in-out infinite forwards;
		}

		@keyframes rockShip {
			0%,
			100% {
				transform: rotate(-3deg);
			}
			50% {
				transform: rotate(3deg);
			}
		}

		@keyframes wave {
			0% {
				stroke-dashoffset: 30;
				opacity: 0;
			}
			100% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'ship',
		role: 'img',
		'(focusin)': 'isAnimating.set(true)',
		'(focusout)': 'handleMouseLeave()',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input<number, NumberInput>(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input<number, NumberInput>(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
