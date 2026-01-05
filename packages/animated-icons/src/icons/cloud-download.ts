import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-cloud-download',
	template: `
		<svg
			class="cloud-download-icon"
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
			<svg:g>
				<svg:path d="M12 13v8l-4-4" />
				<svg:path d="m12 21 4-4" />
			</svg:g>
			<svg:path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		g.animate path {
			transform: translateY(2px);
			transition: transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
		}
		g path {
			transform: translateY(0);
			transition: transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'cloud-download',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloudDownloadIcon {
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
