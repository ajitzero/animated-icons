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
	selector: 'i-timer',
	template: `
		<svg
			class="timer-icon"
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
			<svg:line class="button" x1="10" x2="14" y1="2" y2="2" />
			<svg:line class="hand" x1="12" x2="15" y1="14" y2="11" />
			<svg:circle cx="12" cy="14" r="8" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.timer-icon {
			overflow: visible;
		}

		.timer-icon .button {
			transform-origin: center;
			transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.timer-icon.animate .button {
			animation: buttonPress 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.timer-icon .hand {
			transform-origin: 12px 14px;
			transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.timer-icon.animate .hand {
			transform: rotate(300deg);
			transition-delay: 0.1s;
		}

		@keyframes buttonPress {
			0%,
			100% {
				transform: scale(1) translateY(0);
			}
			50% {
				transform: scale(0.9) translateY(0.5px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'timer',
		role: 'img',
		'(focusin)': 'isAnimating.set(true)',
		'(focusout)': 'handleMouseLeave()',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerIcon {
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
