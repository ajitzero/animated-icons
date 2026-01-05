import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-square-terminal',
	template: `
		<svg
			class="square-terminal-icon"
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
			<svg:path d="m7 11 2-2-2-2" />
			<svg:path class="cursor-line" d="M11 13h4" />
			<svg:rect width="18" height="18" x="3" y="3" rx="2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.square-terminal-icon {
			overflow: visible;
		}

		.cursor-line {
			opacity: 1;
			transition: opacity 0.8s linear;
		}

		.cursor-line.animate {
			animation: blink 0.8s linear infinite;
		}

		@keyframes blink {
			0%,
			100% {
				opacity: 1;
			}
			50% {
				opacity: 0;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'square-terminal',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareTerminalIcon {
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
