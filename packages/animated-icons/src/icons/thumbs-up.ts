import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-thumbs-up',
	template: `
		<svg
			class="thumbs-up-icon"
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
			<svg:path d="M7 10v12" />
			<svg:path
				d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
			/>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.thumbs-up-icon {
			transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		}
		.thumbs-up-icon.animate {
			transform: translate(-1px, -2px) rotate(-12deg);
			transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'thumbs-up',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbsUpIcon {
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
