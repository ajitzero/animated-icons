import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
	afterRenderEffect,
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	linkedSignal,
	numberAttribute,
	signal,
	untracked,
} from '@angular/core';
import { ANIMATED_ICONS_CONFIG } from '../tokens/provider';

@Component({
	selector: 'i-sliders-vertical',
	template: `
		<svg
			class="sliders-vertical-icon"
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
			<!-- Group 1 -->
			<svg:line [attr.y2]="line1a_y2()" x1="4" x2="4" y1="21" />
			<svg:line [attr.y1]="line1b_y1()" x1="4" x2="4" y2="3" />
			<svg:line [attr.y1]="line1c_y1()" [attr.y2]="line1c_y2()" x1="2" x2="6" />

			<!-- Group 2 -->
			<svg:line [attr.y2]="line2a_y2()" x1="12" x2="12" y1="21" />
			<svg:line [attr.y1]="line2b_y1()" x1="12" x2="12" y2="3" />
			<svg:line [attr.y1]="line2c_y1()" [attr.y2]="line2c_y2()" x1="10" x2="14" />

			<!-- Group 3 -->
			<svg:line [attr.y2]="line3a_y2()" x1="20" x2="20" y1="3" />
			<svg:line [attr.y1]="line3b_y1()" x1="20" x2="20" y2="21" />
			<svg:line [attr.y1]="line3c_y1()" [attr.y2]="line3c_y2()" x1="18" x2="22" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.sliders-vertical-icon {
			overflow: visible;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'sliders-vertical',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidersVerticalIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input<number, NumberInput>(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input<number, NumberInput>(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	// Group 1 coordinates
	protected line1a_y2 = signal(14);
	protected line1b_y1 = signal(10);
	protected line1c_y1 = signal(14);
	protected line1c_y2 = signal(14);

	// Group 2 coordinates
	protected line2a_y2 = signal(12);
	protected line2b_y1 = signal(8);
	protected line2c_y1 = signal(8);
	protected line2c_y2 = signal(8);

	// Group 3 coordinates
	protected line3a_y2 = signal(12);
	protected line3b_y1 = signal(16);
	protected line3c_y1 = signal(16);
	protected line3c_y2 = signal(16);

	private animateValue(start: number, end: number, callback: (value: number) => void, duration = 400): Promise<void> {
		return new Promise((resolve) => {
			const startTime = performance.now();
			const animate = (currentTime: number): void => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);

				// Spring-like easing: cubic-bezier(0.34, 1.56, 0.64, 1)
				const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

				const current = start + (end - start) * eased;
				callback(current);

				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					resolve();
				}
			};
			requestAnimationFrame(animate);
		});
	}

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);

			// Animate all values simultaneously
			Promise.all([
				this.animateValue(14, 10, (value) => this.line1a_y2.set(value)),
				this.animateValue(10, 5, (value) => this.line1b_y1.set(value)),
				this.animateValue(14, 9, (value) => {
					this.line1c_y1.set(value);
					this.line1c_y2.set(value);
				}),
				this.animateValue(12, 18, (value) => this.line2a_y2.set(value)),
				this.animateValue(8, 13, (value) => this.line2b_y1.set(value)),
				this.animateValue(8, 14, (value) => {
					this.line2c_y1.set(value);
					this.line2c_y2.set(value);
				}),
				this.animateValue(12, 4, (value) => this.line3a_y2.set(value)),
				this.animateValue(16, 8, (value) => this.line3b_y1.set(value)),
				this.animateValue(16, 8, (value) => {
					this.line3c_y1.set(value);
					this.line3c_y2.set(value);
				}),
			]).then(() => {
				this.isAnimating.set(false);
			});
		}
	}

	handleMouseLeave(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(false);

			// Reset all values to normal
			Promise.all([
				this.animateValue(this.line1a_y2(), 14, (value) => this.line1a_y2.set(value)),
				this.animateValue(this.line1b_y1(), 10, (value) => this.line1b_y1.set(value)),
				this.animateValue(this.line1c_y1(), 14, (value) => {
					this.line1c_y1.set(value);
					this.line1c_y2.set(value);
				}),
				this.animateValue(this.line2a_y2(), 12, (value) => this.line2a_y2.set(value)),
				this.animateValue(this.line2b_y1(), 8, (value) => this.line2b_y1.set(value)),
				this.animateValue(this.line2c_y1(), 8, (value) => {
					this.line2c_y1.set(value);
					this.line2c_y2.set(value);
				}),
				this.animateValue(this.line3a_y2(), 12, (value) => this.line3a_y2.set(value)),
				this.animateValue(this.line3b_y1(), 16, (value) => this.line3b_y1.set(value)),
				this.animateValue(this.line3c_y1(), 16, (value) => {
					this.line3c_y1.set(value);
					this.line3c_y2.set(value);
				}),
			]);
		}
	}

	constructor() {
		afterRenderEffect(() => {
			const animate = this.animate();
			untracked(() => {
				if (animate) {
					this.handleMouseEnter(true);
				} else {
					this.handleMouseLeave(true);
				}
			});
		});
	}
}
