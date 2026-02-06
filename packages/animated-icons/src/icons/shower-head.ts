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
	selector: 'i-shower-head',
	template: `
		<svg
			class="shower-head-icon"
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
			<svg:path d="m4 4 2.5 2.5" />
			<svg:path d="M13.5 6.5a4.95 4.95 0 0 0-7 7" />
			<svg:path d="M15 5 5 15" />
			<svg:g class="drops">
				@for (drop of dropPath; track drop.id) {
					<svg:path class="drop" [id]="drop.id" [attr.d]="drop.d" [style.--shower-head-delay.s]="drop.delay" />
				}
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.shower-head-icon {
			overflow: visible;
		}

		.shower-head-icon .drop {
			opacity: 1;
		}

		.shower-head-icon.animate .drop {
			animation: fadeInOut 1s ease-in-out infinite;
			animation-delay: var(--shower-head-delay);
		}

		@keyframes fadeInOut {
			0%,
			100% {
				opacity: 1;
			}
			50% {
				opacity: 0.2;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'shower-head',
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
export class ShowerHeadIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	protected dropPath = [
		{ id: 'drop1', d: 'M14 17v.01', delay: 0 },
		{ id: 'drop2', d: 'M10 16v.01', delay: 0.2 },
		{ id: 'drop3', d: 'M13 13v.01', delay: 0.4 },
		{ id: 'drop4', d: 'M16 10v.01', delay: 0.6 },
		{ id: 'drop5', d: 'M11 20v.01', delay: 0.8 },
		{ id: 'drop6', d: 'M17 14v.01', delay: 1 },
		{ id: 'drop7', d: 'M20 11v.01', delay: 1.2 },
	];

	handleMouseEnter() {
		this.isAnimating.set(true);
	}
	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
