import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-text-cursor',
	template: `
		<svg
			class="text-cursor-icon"
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
			<svg:path d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" />
			<svg:path d="M7 22h1a4 4 0 0 0 4-4v-1" />
			<svg:path d="M7 2h1a4 4 0 0 1 4 4v1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.text-cursor-icon {
			overflow: visible;
		}

		.text-cursor-icon.animate {
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
		'aria-label': 'text-cursor',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextCursorIcon {
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
