import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-square-arrow-up-right',
	template: `
		<svg
			class="square-arrow-up-right-icon"
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
			<svg:rect width="18" height="18" x="3" y="3" rx="2" />
			<svg:path [class.head]="isAnimating()" d="M8 8h8v8" />
			<svg:path [class.head]="isAnimating()" d="M12 12 L16 8" />
			<svg:path d="M12 12 L8 16" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		path,
		rect {
			transition: all 0.2s ease-out;
		}
		.head {
			transform: translate(-1.5px, 1.5px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'square-arrow-up-right',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareArrowUpRightIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}
}
