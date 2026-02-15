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
	selector: 'i-frame',
	template: `
		<svg
			class="frame-icon"
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
			<svg:line x1="22" x2="2" y1="6" y2="6" />
			<svg:line x1="22" x2="2" y1="18" y2="18" />
			<svg:line x1="6" x2="6" y1="2" y2="22" />
			<svg:line x1="18" x2="18" y1="2" y2="22" />
		</svg>
	`,
	styles: `
		.frame-icon line {
			transition: transform 0.17s ease-in-out;
			transform: translate(0, 0);
		}
		.frame-icon.animate line:nth-child(1) {
			transform: translateY(-4px);
		}
		.frame-icon.animate line:nth-child(2) {
			transform: translateY(4px);
		}
		.frame-icon.animate line:nth-child(3) {
			transform: translateX(-4px);
		}
		.frame-icon.animate line:nth-child(4) {
			transform: translateX(4px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'frame',
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
export class FrameIcon {
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
