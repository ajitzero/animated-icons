import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-archive',
	template: `
		<svg
			class="archive-icon"
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
			<svg:rect [class.animate-rect]="isHovered()" width="20" height="5" x="2" y="3" rx="1" />
			<svg:path [class.animate-path]="isHovered()" d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
			<svg:path [class.animate-path]="isHovered()" d="M10 12h4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		rect {
			transition: transform 0.2s ease-in;
		}

		.animate-rect {
			transform: translateY(-2px);
		}

		.animate-path {
			transform: translateY(2px);
			transition: transform 0.2s ease-in;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'archive',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveIcon {
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
