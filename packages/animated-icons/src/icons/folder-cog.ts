import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	linkedSignal,
	numberAttribute,
} from '@angular/core';
import { ANIMATED_ICONS_CONFIG } from '../tokens/provider';

@Component({
	selector: 'i-folder-cog',
	template: `
		<svg
			class="folder-cog-icon"
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
				d="M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.3"
			/>
			<svg:g class="cog-group">
				<svg:circle cx="18" cy="18" r="3" />
				<svg:path d="m21.7 19.4-.9-.3" />
				<svg:path d="m15.2 16.9-.9-.3" />
				<svg:path d="m16.6 21.7.3-.9" />
				<svg:path d="m19.1 15.2.3-.9" />
				<svg:path d="m19.6 21.7-.4-1" />
				<svg:path d="m16.8 15.3-.4-1" />
				<svg:path d="m14.3 19.6 1-.4" />
				<svg:path d="m20.7 16.8 1-.4" />
			</svg:g>
		</svg>
	`,
	styles: `
		:host {
			display: inline-block;
		}
		.cog-group {
			transform-origin: 18px 18px;
			transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}

		.folder-cog-icon.animate .cog-group {
			transform: rotate(180deg);
		}
	`,
	host: {
		'[class]': 'class()',
		'aria-label': 'folder-cog',
		role: 'img',
		'(focusin)': 'handleMouseEnter()',
		'(focusout)': 'handleMouseLeave()',
		'(mouseenter)': 'handleMouseEnter()',
		'(mouseleave)': 'handleMouseLeave()',
		'(touchstart)': 'handleMouseEnter()',
		'(touchend)': 'handleMouseLeave()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderCogIcon {
	#options = inject(ANIMATED_ICONS_CONFIG);

	color = input(this.#options?.color ?? 'currentColor');
	size = input(this.#options?.size ?? 24, { transform: numberAttribute });
	strokeWidth = input(this.#options?.strokeWidth ?? 2, { transform: numberAttribute });
	class = input('');
	animate = input(false, { transform: booleanAttribute });

	protected isAnimating = linkedSignal(() => this.animate());

	handleMouseEnter() {
		this.isAnimating.set(true);
	}
	handleMouseLeave() {
		if (!this.animate()) this.isAnimating.set(false);
	}
}
