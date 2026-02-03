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
	selector: 'i-align-horizontal-space-around',
	template: `
		<svg
			class="align-horizontal-space-around-icon"
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
			<svg:rect class="rectangle" width="6" height="10" x="9" y="7" rx="2" />
			<svg:path class="left-line" d="M4 22V2" />
			<svg:path class="right-line" d="M20 22V2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.align-horizontal-space-around-icon {
			overflow: visible;
		}

		.rectangle,
		.left-line,
		.right-line {
			transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
			transform-origin: center;
		}

		.align-horizontal-space-around-icon.animate .rectangle {
			transform: scaleX(0.85);
		}

		.align-horizontal-space-around-icon.animate .left-line {
			transform: translateX(2px) scaleY(0.9);
		}

		.align-horizontal-space-around-icon.animate .right-line {
			transform: translateX(-2px) scaleY(0.9);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'align-horizontal-space-around',
		role: 'img',
		'(focusin)': 'isAnimating.set(true)',
		'(focusout)': 'handleMouseLeave()',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
		'(touchstart)': 'isAnimating.set(true)',
		'(touchend)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlignHorizontalSpaceAroundIcon {
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
