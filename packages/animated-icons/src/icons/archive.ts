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
	selector: 'i-archive',
	template: `
		<svg
			class="archive-icon"
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
			<svg:rect class="animate-rect" width="20" height="5" x="2" y="3" rx="1" />
			<svg:path class="animate-path" d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
			<svg:path class="animate-path" d="M10 12h4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.archive-icon .animate-rect {
			transition: transform 0.2s ease-in;
		}

		.archive-icon.animate .animate-rect {
			transform: translateY(-2px);
		}

		.archive-icon.animate .animate-path {
			transform: translateY(2px);
			transition: transform 0.2s ease-in;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'archive',
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
export class ArchiveIcon {
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
