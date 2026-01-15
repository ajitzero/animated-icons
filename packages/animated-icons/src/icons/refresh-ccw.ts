import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-refresh-ccw',
	template: `
		<svg
			class="refresh-ccw-icon"
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
			<svg:path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
			<svg:path d="M3 3v5h5" />
			<svg:path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
			<svg:path d="M16 16h5v5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.refresh-ccw-icon {
			overflow: visible;
			transform-origin: center;
			transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.refresh-ccw-icon.animate {
			transform: rotate(-50deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'refresh-ccw',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefreshCcwIcon {
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
