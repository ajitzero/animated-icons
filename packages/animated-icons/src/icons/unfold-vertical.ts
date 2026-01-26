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
	selector: 'i-unfold-vertical',
	template: `
		<svg
			class="unfold-vertical-icon"
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
			<svg:path d="M4 12H2 M10 12H8 M16 12h-2 M22 12h-2" />
			<svg:g [class.move-up]="isAnimating()">
				<svg:path d="M12 8V2" />
				<svg:path d="m15 5-3-3-3 3" />
			</svg:g>
			<svg:g [class.move-down]="isAnimating()">
				<svg:path d="M12 22v-6" />
				<svg:path d="m15 19-3 3-3-3" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.unfold-vertical-icon {
			overflow: visible;
		}
		.unfold-vertical-icon g {
			transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
		.unfold-vertical-icon.animate .move-up {
			transform: translateY(-2px);
		}
		.unfold-vertical-icon.animate .move-down {
			transform: translateY(2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'unfold-vertical',
		role: 'img',
		'(focusin)': 'isAnimating.set(true)',
		'(focusout)': 'handleMouseLeave()',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnfoldVerticalIcon {
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
