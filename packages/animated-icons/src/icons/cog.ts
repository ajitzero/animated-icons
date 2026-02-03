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
	selector: 'i-cog',
	template: `
		<svg
			class="cog-icon"
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
			<svg:path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
			<svg:path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
			<svg:path d="M12 2v2" />
			<svg:path d="M12 22v-2" />
			<svg:path d="m17 20.66-1-1.73" />
			<svg:path d="M11 10.27 7 3.34" />
			<svg:path d="m20.66 17-1.73-1" />
			<svg:path d="m3.34 7 1.73 1" />
			<svg:path d="M14 12h8" />
			<svg:path d="M2 12h2" />
			<svg:path d="m20.66 7-1.73 1" />
			<svg:path d="m3.34 17 1.73-1" />
			<svg:path d="m17 3.34-1 1.73" />
			<svg:path d="m11 13.73-4 6.93" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.cog-icon {
			transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		}

		.cog-icon.animate {
			transform: rotate(180deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'cog',
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
export class CogIcon {
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
