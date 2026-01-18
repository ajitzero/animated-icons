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
	selector: 'i-trash-2',
	template: `
		<svg
			class="trash-2-icon"
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
			<svg:g [class.is-animated]="isAnimating()">
				<svg:path d="M3 6h18" />
				<svg:path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
			</svg:g>
			<svg:path [class.animate-path]="isAnimating()" d="M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8" />
			<svg:line [class.animate-path]="isAnimating()" x1="10" x2="10" y1="12" y2="17" />
			<svg:line [class.animate-path]="isAnimating()" x1="14" x2="14" y1="12" y2="17" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.is-animated {
			transform: translateY(-1px);
			transition: transform 0.2s ease-in;
		}

		.animate-path {
			transform: translateY(1px);
			transition: transform 0.2s ease-in;
		}

		.is-animated-path {
			transition: d 0.2s ease-in;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'trash-2',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Trash2Icon {
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
