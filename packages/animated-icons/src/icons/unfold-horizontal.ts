import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-unfold-horizontal',
	template: `
		<svg
			class="unfold-horizontal-icon"
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
			<svg:path d="M12 2v2 M12 8v2 M12 14v2 M12 20v2" />
			<svg:g [class.move-left]="isAnimating()">
				<svg:path d="M8 12H2" />
				<svg:path d="m5 9-3 3 3 3" />
			</svg:g>
			<svg:g [class.move-right]="isAnimating()">
				<svg:path d="M16 12h6" />
				<svg:path d="m19 15 3-3-3-3" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.unfold-horizontal-icon {
			overflow: visible;
		}
		.unfold-horizontal-icon g {
			transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
		.move-left {
			transform: translateX(-2px);
		}
		.move-right {
			transform: translateX(2px);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'unfold-horizontal',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnfoldHorizontalIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
