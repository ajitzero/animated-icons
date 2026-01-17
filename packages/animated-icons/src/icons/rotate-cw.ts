import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-rotate-cw',
	template: `
		<svg
			class="rotate-cw-icon"
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
			<svg:path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
			<svg:path d="M21 3v5h-5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.rotate-cw-icon {
			overflow: visible;
			transform-origin: center;
			transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
		.rotate-cw-icon.animate {
			transform: rotate(50deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'rotate-cw',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RotateCwIcon {
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
