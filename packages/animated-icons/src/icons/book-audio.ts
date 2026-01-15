import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-book-audio',
	template: `
		<svg
			class="book-audio-icon"
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
			<svg:path d="M12 6v7" />
			<svg:path d="M16 8v3" />
			<svg:path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
			<svg:path d="M8 8v3" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.book-audio-icon {
			overflow: visible;
		}

		.book-audio-icon.animate {
			animation: bookAnimation 0.6s ease-in-out;
		}

		@keyframes bookAnimation {
			0% {
				transform: scale(1) rotate(0deg) translateY(0);
			}
			20% {
				transform: scale(1.04) rotate(-8deg) translateY(-2px);
			}
			50% {
				transform: scale(1.04) rotate(8deg) translateY(-2px);
			}
			80% {
				transform: scale(1.04) rotate(-8deg) translateY(-2px);
			}
			100% {
				transform: scale(1) rotate(0deg) translateY(0);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'book-audio',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAudioIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		if (!this.isAnimating()) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}
}
