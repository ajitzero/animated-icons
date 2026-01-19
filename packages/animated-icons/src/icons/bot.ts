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
	signal,
} from '@angular/core';
import { ANIMATED_ICONS_CONFIG } from '../tokens/provider';

@Component({
	selector: 'i-bot',
	template: `
		<svg
			class="bot-icon"
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
			<svg:path d="M12 8V4H8" />
			<svg:rect width="16" height="12" x="4" y="8" rx="2" />
			<svg:path d="M2 14h2" />
			<svg:path d="M20 14h2" />
			<svg:line class="eye-right" [attr.y1]="eyeY1()" [attr.y2]="eyeY2()" x1="15" x2="15" />
			<svg:line class="eye-left" [attr.y1]="eyeY1()" [attr.y2]="eyeY2()" x1="9" x2="9" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.bot-icon {
			overflow: visible;
		}

		.eye-left,
		.eye-right {
			transition: none;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'bot',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	protected eyeY1 = signal(13);
	protected eyeY2 = signal(15);

	private animateEyes(startY1: number, startY2: number, endY1: number, endY2: number, delay = 0, duration = 250) {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				const startTime = performance.now();
				const animate = (currentTime: number) => {
					const elapsed = currentTime - startTime;
					const progress = Math.min(elapsed / duration, 1);

					const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

					this.eyeY1.set(startY1 + (endY1 - startY1) * eased);
					this.eyeY2.set(startY2 + (endY2 - startY2) * eased);

					if (progress < 1) {
						requestAnimationFrame(animate);
					} else {
						resolve();
					}
				};
				requestAnimationFrame(animate);
			}, delay);
		});
	}

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			this.animateEyes(13, 15, 14, 14, 200).then(() => {
				this.animateEyes(14, 14, 13, 15).then(() => {
					this.isAnimating.set(false);
				});
			});
		}
	}

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
				// } else {
				// 	if (this.#timer) {
				// 		clearTimeout(this.#timer);
				// 		this.#timer = null;
				// 	}
			}
		});
	}
}
