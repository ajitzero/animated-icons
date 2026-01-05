import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-file-pen',
	template: `
		<svg
			class="file-pen-icon"
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
			<svg:path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5" />
			<svg:path d="M14 2v4a2 2 0 0 0 2 2h4" />
			<svg:path
				class="pen"
				d="M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.file-pen-icon {
			overflow: visible;
		}

		.pen {
			transform-origin: 13.378px 15.626px;
			transition: transform 0.25s ease-in-out;
		}

		.pen.animate {
			animation: penWiggle 0.5s ease-in-out 2;
		}

		@keyframes penWiggle {
			0%,
			100% {
				transform: rotate(0deg) translate(0px, 0px);
			}
			25% {
				transform: rotate(-0.5deg) translate(-1px, 1.5px);
			}
			75% {
				transform: rotate(0.5deg) translate(1.5px, -1px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'file-pen',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilePenIcon {
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
