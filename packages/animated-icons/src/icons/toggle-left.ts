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
	selector: 'i-toggle-left',
	template: `
		<svg
			class="toggle-left-icon"
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
			<svg:circle class="toggle-circle" cx="9" cy="12" r="3" />
			<svg:rect width="20" height="14" x="2" y="5" rx="7" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.toggle-left-icon {
			overflow: visible;
		}

		.toggle-left-icon .toggle-circle {
			transform: translateX(0);
			transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		}

		.toggle-left-icon.animate .toggle-circle {
			transform: translateX(6px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'toggle-left',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLeftIcon {
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
