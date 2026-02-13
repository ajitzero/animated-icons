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
	selector: 'i-plane',
	template: `
		<svg
			class="plane-icon"
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
			<svg:path
				class="plane"
				d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
			/>
			@for (line of speedLines; track line.id) {
				<svg:line
					class="speed-line"
					[attr.x1]="line.x1"
					[attr.y1]="line.y1"
					[attr.x2]="line.x2"
					[attr.y2]="line.y2"
					[style.--plane-delay.s]="line.delay"
				/>
			}
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.plane-icon {
			overflow: visible;
			--x: 0px;
			--y: 0px;
			--scale: 1;
		}

		.plane {
			transform: translate(var(--x), var(--y)) scale(var(--scale));
			transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
			transform-origin: center;
		}

		.plane-icon.animate .plane {
			--x: 3px;
			--y: -3px;
			--scale: 0.8;
		}

		.speed-line {
			opacity: 0;
			transform: translate(-3px, 3px);
			transition:
				opacity 0.15s ease,
				transform 0.15s ease;
			transition-delay: var(--plane-delay);
		}

		.plane-icon.animate .speed-line {
			opacity: 1;
			transform: translate(0, 0);
			animation: dash 0.15s ease forwards;
			animation-delay: var(--plane-delay);
		}

		@keyframes dash {
			to {
				stroke-dashoffset: 0;
			}
		}

		.speed-line {
			stroke-dasharray: 6;
			stroke-dashoffset: 6;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'plane',
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
export class PlaneIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	protected speedLines = [
		{ id: 1, x1: 5, y1: 15, x2: 1, y2: 19, delay: 0.1 },
		{ id: 2, x1: 7, y1: 17, x2: 3, y2: 21, delay: 0.2 },
		{ id: 3, x1: 9, y1: 19, x2: 5, y2: 23, delay: 0.3 },
	];

	handleMouseEnter() {
		this.isAnimating.set(true);
	}
	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
