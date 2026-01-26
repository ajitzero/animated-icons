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
	selector: 'i-history',
	template: `
		<svg
			class="history-icon"
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
				<svg:path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
				<svg:path d="M3 3v5h5" />
			</svg:g>
			<svg:line class="hour-hand" x1="12" y1="12" x2="12" y2="7" />
			<svg:line class="minute-hand" x1="12" y1="12" x2="16" y2="14" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.arrow {
			transform-origin: center;
			transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.history-icon.animate .arrow {
			transform: rotate(-50deg);
		}

		.hour-hand {
			transform-origin: 50% 50%;
			transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.history-icon.animate .hour-hand {
			transform: rotate(-360deg);
		}

		.minute-hand {
			transform-origin: 50% 50%;
			transition: transform 0.5s ease-in-out;
		}

		.history-icon.animate .minute-hand {
			transform: rotate(-45deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'history',
		role: 'img',
		'(focusin)': 'isAnimating.set(true)',
		'(focusout)': 'handleMouseLeave()',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryIcon {
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
