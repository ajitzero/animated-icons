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
	selector: 'i-unplug',
	template: `
		<svg
			class="unplug-icon"
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
			<svg:path class="line-1" d="M19 5l3 -3" />
			<svg:path class="line-2" d="m2 22 3-3" />
			<svg:path class="socket" d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" />
			<svg:path class="spark-1" d="M7.5 13.5l2.5 -2.5" />
			<svg:path class="spark-2" d="M10.5 16.5l2.5 -2.5" />
			<svg:path class="plug" d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.unplug-icon {
			overflow: visible;
		}

		.line-1,
		.line-2,
		.socket,
		.plug,
		.spark-1,
		.spark-2 {
			transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		}

		.unplug-icon.animate .line-1 {
			d: path('M17 7l5 -5');
		}

		.unplug-icon.animate .line-2 {
			d: path('m2 22 6-6');
		}

		.unplug-icon.animate .socket {
			transform: translate(3px, -3px);
		}

		.unplug-icon.animate .plug {
			transform: translate(-3px, 3px);
		}

		.unplug-icon.animate .spark-1 {
			d: path('M10.43 10.57l0.10 -0.10');
		}

		.unplug-icon.animate .spark-2 {
			d: path('M13.43 13.57l0.10 -0.10');
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'unplug',
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
export class UnplugIcon {
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
