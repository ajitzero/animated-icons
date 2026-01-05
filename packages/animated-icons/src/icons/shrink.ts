import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-shrink',
	template: `
		<svg
			class="shrink-icon"
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
			<svg:path [class.animate3]="isHovered()" d="m15 15 6 6m-6-6v4.8m0-4.8h4.8" />
			<svg:path [class.animate2]="isHovered()" d="M9 19.8V15m0 0H4.2M9 15l-6 6" />
			<svg:path [class.animate1]="isHovered()" d="M15 4.2V9m0 0h4.8M15 9l6-6" />
			<svg:path [class.animate0]="isHovered()" d="M9 4.2V9m0 0H4.2M9 9 3 3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		path {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
		.animate0 {
			transform: translate(1px, 1px);
		}
		.animate1 {
			transform: translate(-1px, 1px);
		}
		.animate2 {
			transform: translate(1px, -1px);
		}
		.animate3 {
			transform: translate(-1px, -1px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'shrink',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShrinkIcon {
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
