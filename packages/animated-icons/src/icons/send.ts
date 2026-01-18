import type { BooleanInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	linkedSignal,
	numberAttribute,
} from '@angular/core';
import { ANIMATED_ICONS_CONFIG } from '../tokens/provider';

@Component({
	selector: 'i-send',
	template: `
		<svg
			class="send-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:g [class.animate-group]="isAnimating()">
				<svg:path
					class="path1"
					d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
				/>
				<svg:path class="path2" d="m21.854 2.147-10.94 10.939" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.send-icon {
			overflow: hidden;
		}

		.send-icon .animate-group {
			transform-origin: center;
			animation: sendAnimation 1.2s ease-in-out;
		}

		@keyframes sendAnimation {
			0% {
				transform: scale(1) translateX(0) translateY(0);
			}
			25% {
				transform: scale(0.8) translateX(-10%) translateY(10%);
			}
			50% {
				transform: scale(1) translateX(100%) translateY(-100%);
			}
			50.1% {
				transform: scale(1) translateX(-125%) translateY(125%);
			}
			100% {
				transform: scale(1) translateX(0) translateY(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'send',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1200);
		}
	}

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
			}
		});
	}
}
