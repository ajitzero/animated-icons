import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
	selector: 'i-send-horizontal',
	template: `
		<svg
			class="send-horizontal-icon"
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
			<svg:g [class.animate-group]="isHovered()">
				<svg:path
					class="path1"
					d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"
				/>
				<svg:path class="path2" d="M6 12h16" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.send-horizontal-icon {
			overflow: hidden;
		}

		.animate-group {
			transform-origin: center;
			animation: sendAnimation 1.2s ease-in-out;
		}

		@keyframes sendAnimation {
			0% {
				transform: scale(1) translateX(0);
			}
			25% {
				transform: scale(0.8) translateX(-20%);
			}
			50% {
				transform: scale(1) translateX(100%);
			}
			50.1% {
				transform: scale(1) translateX(-125%);
			}
			100% {
				transform: scale(1) translateX(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'send-horizontal',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendHorizontalIcon {
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
