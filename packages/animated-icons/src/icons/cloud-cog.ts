import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

@Component({
	selector: 'i-cloud-cog',
	template: `
		<svg
			class="cloud-cog-icon"
			[attr.width]="size()"
			[attr.height]="size()"
			[attr.stroke]="color()"
			[attr.stroke-width]="strokeWidth()"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<svg:path d="M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2" />
			<svg:g class="cog-group" [class.animate]="isAnimating()">
				<svg:circle cx="12" cy="17" r="3" />
				<svg:path d="m15.7 18.4-.9-.3" />
				<svg:path d="m9.2 15.9-.9-.3" />
				<svg:path d="m10.6 20.7.3-.9" />
				<svg:path d="m13.1 14.2.3-.9" />
				<svg:path d="m13.6 20.7-.4-1" />
				<svg:path d="m10.8 14.3-.4-1" />
				<svg:path d="m8.3 18.6 1-.4" />
				<svg:path d="m14.7 15.8 1-.4" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.cog-group {
			transform-origin: 12px 17px;
			transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.cog-group.animate {
			transform: rotate(180deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'cloud-cog',
		role: 'img',
		'(mouseenter)': 'isAnimating.set(true)',
		'(mouseleave)': 'isAnimating.set(false)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloudCogIcon {
	color = input('currentColor');
	size = input(24);
	strokeWidth = input(2);
	class = input('');
	animate = input(false);

	protected isAnimating = linkedSignal(() => this.animate());
}
