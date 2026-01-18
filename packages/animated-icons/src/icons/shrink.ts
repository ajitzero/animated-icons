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
	selector: 'i-shrink',
	template: `
		<svg
			class="shrink-icon"
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
			<svg:path [class.animate3]="isAnimating()" d="m15 15 6 6m-6-6v4.8m0-4.8h4.8" />
			<svg:path [class.animate2]="isAnimating()" d="M9 19.8V15m0 0H4.2M9 15l-6 6" />
			<svg:path [class.animate1]="isAnimating()" d="M15 4.2V9m0 0h4.8M15 9l6-6" />
			<svg:path [class.animate0]="isAnimating()" d="M9 4.2V9m0 0H4.2M9 9 3 3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		path {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
		.animate0 {
			transform: translate(1px, 1px);
		}
		.animate1 {
			transform: translate(-1px, 1px);
		}
		.animate2 {
			transform: translate(1px, -1px);
		}
		.animate3 {
			transform: translate(-1px, -1px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'shrink',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShrinkIcon {
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
