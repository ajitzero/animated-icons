import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-undo-dot',
	template: `
		<svg
			class="undo-dot-icon"
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
			<svg:path d="M21 17a9 9 0 0 0-15-6.7L3 13" />
			<svg:path d="M3 7v6h6" />
			<svg:circle cx="12" cy="17" r="1" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.undo-dot-icon {
			transform-origin: 14px 20px;
			transition: transform 0.3s ease;
		}

		.undo-dot-icon.animate {
			transform: rotate(-13deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'undo-dot',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UndoDotIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
