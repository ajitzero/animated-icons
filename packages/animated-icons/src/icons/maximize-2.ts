import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-maximize-2',
	template: `
		<svg
			class="maximize-2-icon"
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
			<svg:polyline [class.top-right]="isAnimating()" points="15 3 21 3 21 9" />
			<svg:polyline [class.bottom-left]="isAnimating()" points="9 21 3 21 3 15" />
			<svg:line [class.top-right]="isAnimating()" x1="21" x2="14" y1="3" y2="10" />
			<svg:line [class.bottom-left]="isAnimating()" x1="3" x2="10" y1="21" y2="14" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		polyline,
		line {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
		.top-right {
			transform: translate(2px, -2px);
		}
		.bottom-left {
			transform: translate(-2px, 2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'maximize-2',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Maximize2Icon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
