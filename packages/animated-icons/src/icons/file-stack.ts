import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-file-stack',
	template: `
		<svg
			class="file-stack-icon"
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
			<svg:path class="file-top" d="M21 7h-3a2 2 0 0 1-2-2V2" />
			<svg:path class="file-top" d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z" />
			<svg:path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" />
			<svg:path class="file-bottom" d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.file-stack-icon {
			overflow: visible;
		}

		.file-top,
		.file-bottom {
			transition: transform 0.3s ease;
		}

		.file-stack-icon.animate .file-top {
			transform: translate(-4px, 4px);
		}

		.file-stack-icon.animate .file-bottom {
			transform: translate(4px, -4px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'file-stack',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileStackIcon {
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
