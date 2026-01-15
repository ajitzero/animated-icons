import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-binary',
	template: `
		<svg
			class="binary-icon"
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
			<svg:rect class="binary-rect1" x="14" y="14" width="4" height="6" rx="2" />
			<svg:rect class="binary-rect2" x="6" y="4" width="4" height="6" rx="2" />
			<svg:path class="binary-path1" d="M6 20h4 M6 14h2v6" />
			<svg:path class="binary-path2" d="M14 4h2v6 M14 10h4" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.binary-icon {
			overflow: visible;
		}

		.binary-rect1,
		.binary-rect2,
		.binary-path1,
		.binary-path2 {
			--duration: 0.25s;
			--timing: cubic-bezier(0.34, 1.56, 0.64, 1);
			transition: transform var(--duration) var(--timing);
		}

		.binary-icon.animate .binary-rect1,
		.binary-icon.animate .binary-rect2,
		.binary-icon.animate .binary-path1,
		.binary-icon.animate .binary-path2 {
			--duration: 0.4s;
			--timing: ease-in-out;
		}

		.binary-icon.animate .binary-rect1 {
			transform: translateX(-8px);
		}

		.binary-icon.animate .binary-rect2 {
			transform: translateX(8px);
		}

		.binary-icon.animate .binary-path1 {
			transform: translateY(-10px);
		}

		.binary-icon.animate .binary-path2 {
			transform: translateY(10px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'binary',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BinaryIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
