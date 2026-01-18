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
} from '@angular/core';
import { ANIMATED_ICONS_CONFIG } from '../tokens/provider';

@Component({
	selector: 'i-layout-template',
	template: `
		<svg
			class="layout-template-icon"
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
			<svg:rect class="top-panel" width="18" height="7" x="3" y="3" rx="1" />
			<svg:rect class="bottom-left-panel" width="9" height="7" x="3" y="14" rx="1" />
			<svg:rect class="bottom-right-panel" width="5" height="7" x="16" y="14" rx="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.layout-template-icon {
			overflow: visible;
		}

		.layout-template-icon.animate .top-panel {
			opacity: 0;
			animation: fadeInTop 0.3s ease-in forwards;
		}

		.layout-template-icon.animate .bottom-left-panel {
			opacity: 0;
			animation: fadeInLeft 0.4s ease-out 0.1s forwards;
		}

		.layout-template-icon.animate .bottom-right-panel {
			opacity: 0;
			animation: fadeInRight 0.4s ease-out 0.2s forwards;
		}

		@keyframes fadeInTop {
			0%,
			20% {
				opacity: 0;
				transform: translateY(-5px);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@keyframes fadeInLeft {
			0%,
			50% {
				opacity: 0;
				transform: translateX(-10px);
			}
			80% {
				opacity: 0.8;
				transform: translateX(3px);
			}
			100% {
				opacity: 1;
				transform: translateX(0);
			}
		}

		@keyframes fadeInRight {
			0%,
			50% {
				opacity: 0;
				transform: translateX(10px);
			}
			80% {
				opacity: 0.8;
				transform: translateX(-2px);
			}
			100% {
				opacity: 1;
				transform: translateX(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'layout-template',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutTemplateIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	#timer: ReturnType<typeof setTimeout> | null = null;

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			this.#timer = setTimeout(() => this.isAnimating.set(false), 650);
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
