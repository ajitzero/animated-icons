import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-list-restart',
	template: `
		<svg
			class="list-restart-icon"
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
			<svg:path d="M21 6H3" />
			<svg:path d="M7 12H3" />
			<svg:path d="M7 18H3" />
			<svg:g class="restart-arrows">
				<svg:path d="M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14" />
				<svg:path d="M11 10v4h4" />
			</svg:g>
		</svg>
	`,
	styles: `
		.list-restart-icon {
			transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.restart-arrows {
			transform-origin: center;
			transform-box: fill-box;
			transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.animate .restart-arrows {
			transform: rotate(-50deg);
		}

		svg {
			overflow: visible;
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'list-restart',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListRestartIcon {
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
