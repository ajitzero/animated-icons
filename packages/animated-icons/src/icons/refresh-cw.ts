import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-refresh-cw',
	template: `
		<svg
			class="refresh-cw-icon"
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
			<svg:path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
			<svg:path d="M21 3v5h-5" />
			<svg:path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
			<svg:path d="M8 16H3v5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.refresh-cw-icon {
			transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			transform-origin: center;
		}
		.refresh-cw-icon.animate {
			transform: rotate(50deg);
		}

		svg {
			overflow: visible;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'refresh-cw',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefreshCwIcon {
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
