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
	selector: 'i-rotate-ccw-key',
	template: `
		<svg
			class="rotate-ccw-key-icon"
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
			<svg:g class="arrow">
				<svg:path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" />
				<svg:path d="M3 3v5h5" />
			</svg:g>
			<svg:g class="key">
				<svg:path d="m14.5 9.5 1 1" />
				<svg:path d="m15.5 8.5-4 4" />
				<svg:circle cx="10" cy="14" r="2" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.rotate-ccw-key-icon {
			overflow: visible;
		}

		.rotate-ccw-key-icon,
		.rotate-ccw-key-icon .arrow,
		.rotate-ccw-key-icon .key {
			transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			transform-origin: center;
		}

		.rotate-ccw-key-icon.animate .arrow {
			transform: rotate(-50deg);
			transition-delay: 0.1s;
		}

		.rotate-ccw-key-icon.animate .key {
			transform: rotate(-25deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'rotate-ccw-key',
		role: 'img',
		'(focusin)': 'isAnimating.set(true)',
		'(focusout)': 'handleMouseLeave()',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RotateCcwKeyIcon {
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
