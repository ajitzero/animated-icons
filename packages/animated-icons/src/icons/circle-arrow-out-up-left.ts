import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-circle-arrow-out-up-left',
	template: `
		<svg
			class="circle-arrow-out-up-left-icon"
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
			<svg:g class="arrow">
				<svg:path d="M2 8V2h6" />
				<svg:path d="m2 2 10 10" />
			</svg:g>
			<svg:path d="M12 2A10 10 0 1 1 2 12" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.arrow {
			transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
		.arrow.animate {
			animation: moveUpLeft 0.5s;
		}
		@keyframes moveUpLeft {
			0%,
			100% {
				transform: translate(0, 0);
			}
			50% {
				transform: translate(2px, 2px);
			}
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'circle-arrow-out-up-left',
		role: 'img',
		'(mouseenter)': 'handleMouseEnter()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircleArrowOutUpLeftIcon {
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
