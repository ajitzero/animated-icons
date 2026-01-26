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
	selector: 'i-minimize',
	template: `
		<svg
			class="minimize-icon"
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
			<svg:path class="top-left" d="M8 3v3a2 2 0 0 1-2 2H3" />
			<svg:path class="top-right" d="M21 8h-3a2 2 0 0 1-2-2V3" />
			<svg:path class="bottom-left" d="M3 16h3a2 2 0 0 1 2 2v3" />
			<svg:path class="bottom-right" d="M16 21v-3a2 2 0 0 1 2-2h3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.minimize-icon path {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.minimize-icon.animate .bottom-right {
			transform: translate(-1px, -1px);
		}

		.minimize-icon.animate .top-left {
			transform: translate(1px, 1px);
		}

		.minimize-icon.animate .bottom-left {
			transform: translate(1px, -1px);
		}

		.minimize-icon.animate .top-right {
			transform: translate(-1px, 1px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'minimize',
		role: 'img',
		'(focusin)': 'isAnimating.set(true)',
		'(focusout)': 'handleMouseLeave()',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimizeIcon {
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
