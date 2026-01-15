import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-file-sliders',
	template: `
		<svg
			class="file-sliders-icon"
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
				d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
			/>
			<svg:path d="M14 2v5a1 1 0 0 0 1 1h5" />
			<svg:path d="M8 12h8" />
			<svg:path [class.animate-line1]="isAnimating()" d="M10 11v2" />
			<svg:path d="M8 17h8" />
			<svg:path [class.animate-line2]="isAnimating()" d="M14 16v2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}

		path {
			transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
		}

		.animate-line1 {
			transform: translateX(4px);
		}

		.animate-line2 {
			transform: translateX(-4px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'file-sliders',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileSlidersIcon {
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
