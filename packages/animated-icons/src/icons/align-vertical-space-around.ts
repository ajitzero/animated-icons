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
	selector: 'i-align-vertical-space-around',
	template: `
		<svg
			class="align-vertical-space-around-icon"
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
			<svg:rect class="rectangle" width="10" height="6" x="7" y="9" rx="2" />
			<svg:path class="top-line" d="M22 4H2" />
			<svg:path class="bottom-line" d="M22 20H2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.align-vertical-space-around-icon {
			overflow: visible;
		}

		.rectangle,
		.top-line,
		.bottom-line {
			transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
			transform-origin: center;
		}

		.align-vertical-space-around-icon.animate .rectangle {
			transform: scaleY(0.8);
		}

		.align-vertical-space-around-icon.animate .top-line {
			transform: translateY(2px) scaleX(0.9);
		}

		.align-vertical-space-around-icon.animate .bottom-line {
			transform: translateY(-2px) scaleX(0.9);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'align-vertical-space-around',
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
export class AlignVerticalSpaceAroundIcon {
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
