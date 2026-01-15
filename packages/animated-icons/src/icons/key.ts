import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-key',
	template: `
		<svg
			class="key-icon"
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
			<svg:path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
			<svg:path d="m21 2-9.6 9.6" />
			<svg:circle cx="7.5" cy="15.5" r="5.5" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		svg {
			transform-origin: center;
			transform: rotate(0deg);
			transition: transform 0.3s ease-out;
		}

		.animate {
			transform: rotate(-28deg);
			transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'key',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
