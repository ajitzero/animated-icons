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
	selector: 'i-between-vertical-end',
	template: `
		<svg
			class="between-vertical-end-icon"
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
			<svg:rect class="rect-left" width="7" height="13" x="3" y="3" rx="1" />
			<svg:path class="arrow" d="m9 22 3-3 3 3" />
			<svg:rect class="rect-right" width="7" height="13" x="14" y="3" rx="1" />
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
			transform: translateY(-2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'between-vertical-end',
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
export class BetweenVerticalEndIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		this.isAnimating.set(true);
	}
	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
