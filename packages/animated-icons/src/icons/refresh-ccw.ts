import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-refresh-ccw',
	template: `
		<svg
			class="refresh-ccw-icon"
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
		.refresh-icon {
			transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			transform-origin: center;
		}

		.refresh-icon.animate {
			transform: rotate(-50deg);
		}

		svg {
			overflow: visible;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'refresh-ccw',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefreshCcwIcon {
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
