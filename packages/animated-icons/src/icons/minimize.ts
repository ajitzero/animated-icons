import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-minimize',
	template: `
		<svg
			class="minimize-icon"
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
			<svg:path [class.top-left]="isHovered()" d="M8 3v3a2 2 0 0 1-2 2H3" />
			<svg:path [class.top-right]="isHovered()" d="M21 8h-3a2 2 0 0 1-2-2V3" />
			<svg:path [class.bottom-left]="isHovered()" d="M3 16h3a2 2 0 0 1 2 2v3" />
			<svg:path [class.bottom-right]="isHovered()" d="M16 21v-3a2 2 0 0 1 2-2h3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		path {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.bottom-right {
			transform: translate(-1px, -1px);
		}

		.top-left {
			transform: translate(1px, 1px);
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
		'aria-label': 'minimize',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MinimizeIcon {
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
