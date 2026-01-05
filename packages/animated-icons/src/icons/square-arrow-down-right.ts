import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-square-arrow-down-right',
	template: `
		<svg
			class="square-arrow-down-right-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isHovered()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:rect width="18" height="18" x="3" y="3" rx="2" />
			<svg:path [class.head]="isHovered()" d="M16 8v8H8" />
			<svg:path [class.head]="isHovered()" d="M16 16 L12 12" />
			<svg:path d="M8 8 L12 12" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		path {
			transition: all 0.2s ease-out;
		}
		.head {
			transform: translate(-1.5px, -1.5px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'square-arrow-down-right',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareArrowDownRightIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');

	isHovered = signal(false);

	handleMouseEnter() {
		if (!this.isHovered()) {
			this.isHovered.set(true);

			setTimeout(() => {
				this.isHovered.set(false);
			}, 1400);
		}
	}
}
