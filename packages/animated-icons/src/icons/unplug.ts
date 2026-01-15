import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

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
		svg {
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

		.line-1.animate {
			d: path('M17 7l5 -5');
		}

		.line-2.animate {
			d: path('m2 22 6-6');
		}

		.socket.animate {
			transform: translate(3px, -3px);
		}

		.plug.animate {
			transform: translate(-3px, 3px);
		}

		.spark-1.animate {
			d: path('M10.43 10.57l0.10 -0.10');
		}

		.spark-2.animate {
			d: path('M13.43 13.57l0.10 -0.10');
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'unplug',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnplugIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
