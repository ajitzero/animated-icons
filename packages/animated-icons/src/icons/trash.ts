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
	selector: 'i-trash',
	template: `
		<svg
			class="trash-icon"
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
			<svg:g class="group">
				<svg:path d="M3 6h18" />
				<svg:path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
			</svg:g>
			<svg:path class="animate-path" d="M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.trash-icon.animate .group {
			transform: translateY(-1px);
			transition: transform 0.2s ease-in;
		}

		.trash-icon.animate .animate-path {
			transform: translateY(1px);
			transition: transform 0.2s ease-in;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'trash',
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
export class TrashIcon {
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
