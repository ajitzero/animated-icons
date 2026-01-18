import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-images',
	template: `
		<svg
			class="images-icon"
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
			<svg:path class="images-path-1" d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16" />
			<svg:path class="images-path-2" d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2" />
			<svg:circle class="images-circle" cx="13" cy="7" r="1" />
			<svg:rect class="images-rect" x="8" y="2" width="14" height="14" rx="2" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.images-icon {
			overflow: visible;
		}

		.images-path-1,
		.images-path-2,
		.images-circle,
		.images-rect {
			transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		}

		.images-icon.animate .images-path-1 {
			transform: translate(-3px, 3px);
		}

		.images-icon.animate .images-path-2 {
			transform: translate(3px, -3px);
		}

		.images-icon.animate .images-circle {
			transform: translate(-3px, 3px);
		}

		.images-icon.animate .images-rect {
			transform: translate(-3px, 3px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'images',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesIcon {
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
