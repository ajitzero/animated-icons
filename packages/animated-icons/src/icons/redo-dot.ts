import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-redo-dot',
	template: `
		<svg
			class="redo-dot-icon"
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
			<svg:circle cx="12" cy="17" r="1" />
			<svg:path class="arrow" d="M21 7v6h-6" />
			<svg:path class="curve" d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.redo-dot-icon {
			transform-origin: 14px 20px;
			transition: transform 0.3s ease;
		}

		.redo-dot-icon.animate {
			transform: rotate(13deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'redo-dot',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedoDotIcon {
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
