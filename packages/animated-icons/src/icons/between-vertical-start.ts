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
	selector: 'i-between-vertical-start',
	template: `
		<svg
			class="between-vertical-start-icon"
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
			<svg:rect class="rect-left" width="7" height="13" x="3" y="8" rx="1" />
			<svg:path class="arrow" d="m15 2-3 3-3-3" />
			<svg:rect class="rect-right" width="7" height="13" x="14" y="8" rx="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.rect-left {
			transition: all 0.15s ease-in;
		}

		.rect-left.animate {
			transform: translateX(-1px);
		}

		.rect-right {
			transition: all 0.15s ease-in;
		}

		.rect-right.animate {
			transform: translateX(1px);
		}

		.arrow {
			transition: all 0.15s ease-in;
		}

		.arrow.animate {
			transform: translateY(2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'between-vertical-start',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BetweenVerticalStartIcon {
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
