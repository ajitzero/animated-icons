import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-clipboard',
	template: `
		<svg
			class="clipboard-icon"
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
			<svg:rect class="clip" width="8" height="4" x="8" y="2" rx="1" ry="1" />
			<svg:path class="board" d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		.clipboard-icon {
			overflow: visible;
		}

		.clip,
		.board {
			transition: transform 0.3s ease;
		}

		.clipboard-icon.animate .clip {
			animation: clipBounce 0.5s ease-in-out;
		}

		.clipboard-icon.animate .board {
			animation: boardShake 0.5s ease-in-out;
		}

		@keyframes clipBounce {
			0% {
				transform: translateY(0);
			}
			25% {
				transform: translateY(-2px);
			}
			50% {
				transform: translateY(1px);
			}
			100% {
				transform: translateY(0);
			}
		}

		@keyframes boardShake {
			0% {
				transform: rotate(0deg);
			}
			25% {
				transform: rotate(-1deg);
			}
			75% {
				transform: rotate(1deg);
			}
			100% {
				transform: rotate(0deg);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'clipboard',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardIcon {
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
