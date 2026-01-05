import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-download',
	template: `
		<svg
			class="download-icon"
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
			<svg:path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<svg:g>
				<svg:polyline points="7 10 12 15 17 10" />
				<svg:line x1="12" x2="12" y1="15" y2="3" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		g.animate polyline,
		g.animate line {
			transform: translateY(2px);
			transition: transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
		}

		g polyline,
		g line {
			transform: translateY(0);
			transition: transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'download',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadIcon {
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
