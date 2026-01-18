import { ChangeDetectionStrategy, Component, effect, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-paperclip',
	template: `
		<svg
			class="paperclip-icon"
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
			<svg:path
				class="paperclip-path"
				d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.paperclip-icon {
			overflow: visible;
		}

		.paperclip-path {
			stroke-dasharray: 87;
			stroke-dashoffset: 0;
			transition:
				stroke-dashoffset 0.6s ease-in,
				opacity 0.1s ease-in;
		}

		.paperclip-icon.animate .paperclip-path {
			animation: drawPath 0.6s ease-in forwards;
		}

		@keyframes drawPath {
			0% {
				stroke-dashoffset: 87;
			}
			15% {
				stroke-dashoffset: 87;
			}
			100% {
				stroke-dashoffset: 174;
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'paperclip',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaperclipIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter(forced = false) {
		if (forced || (!this.animate() && !this.isAnimating())) {
			this.isAnimating.set(true);
			setTimeout(() => this.isAnimating.set(false), 1400);
		}
	}

	constructor() {
		effect(() => {
			const animate = this.animate();
			if (animate) {
				this.handleMouseEnter(true);
			}
		});
	}
}
