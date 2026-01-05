import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-maximize',
	template: `
		<svg
			class="maximize-icon"
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
			<svg:path [class.top-left]="isHovered()" d="M8 3H5a2 2 0 0 0-2 2v3" />
			<svg:path [class.top-right]="isHovered()" d="M21 8V5a2 2 0 0 0-2-2h-3" />
			<svg:path [class.bottom-left]="isHovered()" d="M3 16v3a2 2 0 0 0 2 2h3" />
			<svg:path [class.bottom-right]="isHovered()" d="M16 21h3a2 2 0 0 0 2-2v-3" />
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
			transform: translate(2px, 2px);
		}

		.bottom-left {
			transform: translate(-2px, 2px);
		}

		.top-right {
			transform: translate(2px, -2px);
		}

		.top-left {
			transform: translate(-2px, -2px);
		}

		svg {
			overflow: visible;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'maximize',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaximizeIcon {
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
