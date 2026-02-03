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
	selector: 'i-expand',
	template: `
		<svg
			class="expand-icon"
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
			<svg:path class="corner top-right" d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
			<svg:path class="corner bottom-left" d="M3 16.2V21m0 0h4.8M3 21l6-6" />
			<svg:path class="corner top-left" d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
			<svg:path class="corner bottom-right" d="M3 7.8V3m0 0h4.8M3 3l6 6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.expand-icon {
			overflow: visible;
		}

		.corner {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.expand-icon.animate .top-right {
			transform: translate(2px, 2px);
		}

		.expand-icon.animate .bottom-left {
			transform: translate(-2px, 2px);
		}

		.expand-icon.animate .top-left {
			transform: translate(2px, -2px);
		}

		.expand-icon.animate .bottom-right {
			transform: translate(-2px, -2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'expand',
		role: 'img',
		'(focusin)': 'handleMouseEnter()',
		'(focusout)': 'handleMouseLeave()',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
		'(touchstart)': 'handleMouseEnter()',
		'(touchend)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input<number, NumberInput>(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input<number, NumberInput>(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		this.isAnimating.set(true);
	}
	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
