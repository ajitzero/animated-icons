import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-minimize-2',
	template: `
		<svg
			class="minimize-2-icon"
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
			<svg:polyline [class.bottom-left]="isHovered()" points="4 14 10 14 10 20" />
			<svg:polyline [class.top-right]="isHovered()" points="20 10 14 10 14 4" />
			<svg:line [class.top-right]="isHovered()" x1="14" x2="21" y1="10" y2="3" />
			<svg:line [class.bottom-left]="isHovered()" x1="3" x2="10" y1="21" y2="14" />
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
		.bottom-left {
			transform: translate(1px, -1px);
		}
		.top-right {
			transform: translate(-1px, 1px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'minimize-2',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Minimize2Icon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');

	isHovered = signal(false);

	handleMouseEnter() {
		this.isHovered.set(true);
	}

	handleMouseLeave() {
		this.isHovered.set(false);
	}
}
