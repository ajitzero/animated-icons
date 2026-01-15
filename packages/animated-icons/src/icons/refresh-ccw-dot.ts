import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-refresh-ccw-dot',
	template: `
		<svg
			class="refresh-ccw-dot-icon"
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
			<svg:path d="M3 2v6h6" />
			<svg:path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
			<svg:path d="M21 22v-6h-6" />
			<svg:path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
			<svg:circle cx="12" cy="12" r="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.refresh-ccw-dot-icon {
			overflow: visible;
			transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			transform-origin: center;
		}
		.refresh-ccw-dot-icon.animate {
			transform: rotate(-50deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'refresh-ccw-dot',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefreshCcwDotIcon {
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
