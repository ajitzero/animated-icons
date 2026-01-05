import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-move-up-left',
	template: `
		<svg
			class="move-up-left-icon"
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
			<svg:path d="M5 11V5h6" />
			<svg:path d="m5 5 14 14" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		path {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.animate {
			animation: moveUpLeft 0.5s;
		}

		@keyframes moveUpLeft {
			0%,
			100% {
				transform: translate(0, 0);
			}
			50% {
				transform: translate(-3px, -3px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'move-up-left',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoveUpLeftIcon {
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
