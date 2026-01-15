import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-file-terminal',
	template: `
		<svg
			class="file-terminal-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			[class.animate]="isAnimating()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
			<svg:path d="M14 2v4a2 2 0 0 0 2 2h4" />
			<svg:path d="m8 16 2-2-2-2" />
			<svg:path class="cursor-line" d="M12 18h4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.file-terminal-icon {
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
		'aria-label': 'file-terminal',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTerminalIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
