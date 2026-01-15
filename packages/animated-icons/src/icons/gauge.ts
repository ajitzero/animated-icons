import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-gauge',
	template: `
		<svg
			class="gauge-icon"
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
			<svg:path class="gauge-needle" d="m12 14 4-4" />
			<svg:path d="M3.34 19a10 10 0 1 1 17.32 0" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.gauge-icon {
			overflow: visible;
		}

		.gauge-needle {
			transform-origin: 12px 14px;
			transition: transform 0.6s cubic-bezier(0.16, 1.4, 0.3, 1);
		}

		.gauge-icon.animate .gauge-needle {
			transform: rotate(72deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'gauge',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GaugeIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
