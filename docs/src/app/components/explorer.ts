import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { AccessibilityIcon, ActivityIcon, AirplayIcon } from '../../../../packages/animated-icons/src';
import { IconCard } from './icon-card';
import type { IconItem } from './icon-item.type';

@Component({
	selector: 'docs-explorer',
	template: `
		<div class="relative max-w-sm">
			<input class="peer pe-18" [(ngModel)]="searchTerm" hlmInput placeholder="Search icons..." />
			<div
				class="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-xs peer-disabled:opacity-50"
			>
				{{ iconCountMessage() }}
			</div>
		</div>

		@let icons = filteredIcons();

		@if (icons.length === 0) {
			<div class="bg-background my-4" hlmEmpty>
				<div hlmEmptyHeader>
					<div hlmEmptyTitle>No icons matched</div>
					<div hlmEmptyDescription>
						There are no icons for <strong>"{{ searchTerm() }}"</strong>. Please try searching by other names.
					</div>
				</div>
				<div hlmEmptyContent>
					<div class="flex gap-2">
						<button (click)="searchTerm.set('')" hlmBtn>Clear Search</button>
					</div>
				</div>
			</div>
		} @else {
			<div class="my-4 grid w-full max-w-2xl grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-1 p-2">
				@for (icon of icons; track icon.name) {
					<docs-icon-card [icon]="icon" />
				}
			</div>
		}
	`,
	host: {
		class: 'flex flex-col items-center',
	},
	imports: [FormsModule, HlmButtonImports, HlmEmptyImports, HlmInputImports, IconCard],
})
export class Explorer {
	searchTerm = signal('');

	icons = signal<IconItem[]>([
		{ name: 'accessibility', component: AccessibilityIcon },
		{ name: 'activity', component: ActivityIcon },
		{ name: 'airplay', component: AirplayIcon },
		// { name: 'alarm-clock' },
	]);

	filteredIcons = computed(() => {
		const searchTerm = this.searchTerm();
		const icons = this.icons();

		if (!searchTerm) {
			return icons;
		}

		return icons.filter((icon) => icon.name.includes(searchTerm));
	});

	iconCountMessage = computed(() => {
		const icons = this.icons();
		const filteredIcons = this.filteredIcons();
		if (icons.length === filteredIcons.length) {
			return `${icons.length} icons`;
		}

		return `${filteredIcons.length}/${icons.length} icons`;
	});
}
