import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-thumbs-down',
	template: `
		<svg
			class="thumbs-down-icon"
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
			<svg:path d="M17 14V2" />
			<svg:path
				d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.thumbs-down-icon {
			transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		}
		.thumbs-down-icon.animate {
			transform: translate(-1px, 2px) rotate(-12deg);
			transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'thumbs-down',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbsDownIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
