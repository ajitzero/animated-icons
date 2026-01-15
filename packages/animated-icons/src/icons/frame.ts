import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-frame',
	template: `
		<svg
			class="frame-icon"
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
			<svg:line
				[class.animate-line]="isAnimating()"
				[style.transform]="isAnimating() ? 'translateY(-4px)' : 'translateY(0)'"
				[style.transition]="'transform 0.17s ease-in-out'"
				x1="22"
				x2="2"
				y1="6"
				y2="6"
			/>
			<svg:line
				[class.animate-line]="isAnimating()"
				[style.transform]="isAnimating() ? 'translateY(4px)' : 'translateY(0)'"
				[style.transition]="'transform 0.17s ease-in-out'"
				x1="22"
				x2="2"
				y1="18"
				y2="18"
			/>
			<svg:line
				[class.animate-line]="isAnimating()"
				[style.transform]="isAnimating() ? 'translateX(-4px)' : 'translateX(0)'"
				[style.transition]="'transform 0.17s ease-in-out'"
				x1="6"
				x2="6"
				y1="2"
				y2="22"
			/>
			<svg:line
				[class.animate-line]="isAnimating()"
				[style.transform]="isAnimating() ? 'translateX(4px)' : 'translateX(0)'"
				[style.transition]="'transform 0.17s ease-in-out'"
				x1="18"
				x2="18"
				y1="2"
				y2="22"
			/>
		</svg>
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'frame',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameIcon {
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
