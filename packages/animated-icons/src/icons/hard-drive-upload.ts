import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-hard-drive-upload',
	template: `
		<svg
			class="hard-drive-upload-icon"
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
			<svg:g>
				<svg:path d="m16 6-4-4-4 4" />
				<svg:path d="M12 2v8" />
			</svg:g>
			<svg:rect width="20" height="8" x="2" y="14" rx="2" />
			<svg:path d="M6 18h.01" />
			<svg:path d="M10 18h.01" />
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.hard-drive-upload {
			overflow: visible;
		}
		g.animate path {
			transform: translateY(-2px);
			transition: transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
		}
		g path {
			transform: translateY(0);
			transition: transform 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'hard-drive-upload',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HardDriveUploadIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
