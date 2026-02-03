import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
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
	selector: 'i-square-dashed-kanban',
	template: `
		<svg
			class="square-dashed-kanban-icon"
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
			<svg:path class="column column-0" d="M8 7v7" />
			<svg:path class="column column-1" d="M12 7v4" />
			<svg:path class="column column-2" d="M16 7v9" />
			<svg:path d="M5 3a2 2 0 0 0-2 2" />
			<svg:path d="M9 3h1" />
			<svg:path d="M14 3h1" />
			<svg:path d="M19 3a2 2 0 0 1 2 2" />
			<svg:path d="M21 9v1" />
			<svg:path d="M21 14v1" />
			<svg:path d="M21 19a2 2 0 0 1-2 2" />
			<svg:path d="M14 21h1" />
			<svg:path d="M9 21h1" />
			<svg:path d="M5 21a2 2 0 0 1-2-2" />
			<svg:path d="M3 14v1" />
			<svg:path d="M3 9v1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.square-dashed-kanban-icon {
			overflow: visible;
		}

		.column {
			stroke-dasharray: 20;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.3s ease,
				opacity 0.3s ease;
		}

		.square-dashed-kanban-icon.animate .column {
			animation: columnAnimation 0.6s ease forwards;
		}

		.square-dashed-kanban-icon.animate .column-0 {
			animation-delay: 0s;
		}

		.square-dashed-kanban-icon.animate .column-1 {
			animation-delay: 0.1s;
		}

		.square-dashed-kanban-icon.animate .column-2 {
			animation-delay: 0.2s;
		}

		@keyframes columnAnimation {
			0% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
			50% {
				stroke-dashoffset: 20;
				opacity: 0;
			}
			100% {
				stroke-dashoffset: 0;
				opacity: 1;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'square-dashed-kanban',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(focusin)': 'handleMouseEnter()',
		'(touchstart)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareDashedKanbanIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input<number, NumberInput>(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input<number, NumberInput>(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	#timer: ReturnType<typeof setTimeout> | null = null;

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			this.#timer = setTimeout(() => this.isAnimating.set(false), 700);
		}
	}

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
			} else {
				if (this.#timer) {
					clearTimeout(this.#timer);
					this.#timer = null;
				}
			}
		});
	}
}
