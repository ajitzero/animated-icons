import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-rotate-ccw-key',
	template: `
		<svg
			class="rotate-ccw-key-icon"
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
			<svg:g class="arrow">
				<svg:path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8" />
				<svg:path d="M3 3v5h5" />
			</svg:g>
			<svg:g class="key">
				<svg:path d="m14.5 9.5 1 1" />
				<svg:path d="m15.5 8.5-4 4" />
				<svg:circle cx="10" cy="14" r="2" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.rotate-ccw-key-icon,
		.arrow,
		.key {
			transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			transform-origin: center;
		}

		.arrow.animate {
			transform: rotate(-50deg);
			transition-delay: 0.1s;
		}

		.key.animate {
			transform: rotate(-25deg);
		}

		svg {
			overflow: visible;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'rotate-ccw-key',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RotateCcwKeyIcon {
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
