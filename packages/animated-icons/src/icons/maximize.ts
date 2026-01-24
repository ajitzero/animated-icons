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
	selector: 'i-maximize',
	template: `
		<svg
			class="maximize-icon"
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
			<svg:path class="top-left" d="M8 3H5a2 2 0 0 0-2 2v3" />
			<svg:path class="top-right" d="M21 8V5a2 2 0 0 0-2-2h-3" />
			<svg:path class="bottom-left" d="M3 16v3a2 2 0 0 0 2 2h3" />
			<svg:path class="bottom-right" d="M16 21h3a2 2 0 0 0 2-2v-3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.maximize-icon path {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.maximize-icon.animate .bottom-right {
			transform: translate(2px, 2px);
		}

		.maximize-icon.animate .bottom-left {
			transform: translate(-2px, 2px);
		}

		.maximize-icon.animate .top-right {
			transform: translate(2px, -2px);
		}

		.maximize-icon.animate .top-left {
			transform: translate(-2px, -2px);
		}

		svg {
			overflow: visible;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'maximize',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaximizeIcon {
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
