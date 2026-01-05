import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-file-minus',
	template: `
		<svg
			class="file-minus-icon"
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
			<svg:path class="file" d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
			<svg:path class="file" d="M14 2v4a2 2 0 0 0 2 2h4" />
			<svg:path class="horizontal" d="M9 15h6" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.file-minus {
			overflow: visible;
		}

		.horizontal {
			stroke-dasharray: 8;
			stroke-dashoffset: 0;
			transition: stroke-dashoffset 0.5s ease-out;
		}

		.file-minus.animate .horizontal {
			opacity: 0;
			animation: lineAnimation 0.5s ease-out forwards;
		}

		@keyframes lineAnimation {
			0% {
				opacity: 0;
				stroke-dashoffset: 8;
			}
			15% {
				opacity: 1;
				stroke-dashoffset: 8;
			}
			100% {
				opacity: 1;
				stroke-dashoffset: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'file-minus',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileMinusIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');

	isHovered = signal(false);

	handleMouseEnter() {
		if (!this.isHovered()) {
			this.isHovered.set(true);

			setTimeout(() => {
				this.isHovered.set(false);
			}, 1400);
		}
	}
}
