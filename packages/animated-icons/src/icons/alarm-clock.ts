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
	selector: 'i-alarm-clock',
	template: `
		<svg
			class="alarm-clock-icon"
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
			<svg:path class="primary-path" d="M18 20.5L19.5 22" />
			<svg:path class="primary-path" d="M6 20.5L4.5 22" />
			<svg:path
				class="primary-path"
				d="M21 13C21 17.968 16.968 22 12 22C7.032 22 3 17.968 3 13C3 8.032 7.032 4 12 4C16.968 4 21 8.032 21 13Z"
			/>
			<svg:path
				class="primary-path"
				d="M15.339 15.862L12.549 14.197C12.063 13.909 11.667 13.216 11.667 12.649V8.95898"
			/>
			<svg:path class="secondary-path" d="M18 2L21.747 5.31064" />
			<svg:path class="secondary-path" d="M6 2L2.25304 5.31064" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.alarm-clock-icon {
			overflow: visible;
		}

		.alarm-clock-icon path {
			transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		}

		.alarm-clock-icon.animate .primary-path {
			animation: primaryPathAnimation 0.3s linear infinite;
		}

		.alarm-clock-icon.animate .secondary-path {
			animation: secondaryPathAnimation 0.3s linear infinite;
		}

		@keyframes primaryPathAnimation {
			0%,
			100% {
				transform: translate(0, -1.5px);
			}
			20%,
			60% {
				transform: translate(-1px, -1.5px);
			}
			40%,
			80% {
				transform: translate(1px, -1.5px);
			}
		}

		@keyframes secondaryPathAnimation {
			0%,
			100% {
				transform: translate(0, -2.5px);
			}
			20%,
			60% {
				transform: translate(-2px, -2.5px);
			}
			40%,
			80% {
				transform: translate(2px, -2.5px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'alarm-clock',
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
export class AlarmClockIcon {
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
