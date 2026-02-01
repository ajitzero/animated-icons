import { Clipboard } from '@angular/cdk/clipboard';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCopy } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';

type PackageManager = { id: string; cmd: string };

@Component({
	selector: 'docs-installer',
	template: `
		<hlm-tabs tab="npm">
			<hlm-tabs-list>
				@for (packageManager of packageManagers; track packageManager.id) {
					<button [hlmTabsTrigger]="packageManager.id">
						{{ packageManager.id }}
					</button>
				}
			</hlm-tabs-list>
			@for (packageManager of packageManagers; track packageManager.id) {
				<div
					class="bg-background dark:bg-muted m-0 flex items-center justify-between rounded-lg p-2 ps-4 text-left"
					[hlmTabsContent]="packageManager.id"
				>
					<kbd class="flex gap-2">
						<span class="text-neutral-400">{{ packageManager.id }} {{ packageManager.cmd }}</span>
						<span class="select-all">{{ packageName() }}</span>
						<span class="text-neutral-400 -ml-1.5">@latest</span>
					</kbd>

					<button
						[hlmTooltipTrigger]="'Copy to clipboard'"
						[disabled]="copied()"
						(click)="copy(packageManager)"
						hlmBtn
						variant="outline"
						size="icon"
					>
						<ng-icon
              class="absolute transition-all"
							[ngClass]="{
								'scale-0 opacity-0': copied(),
								'scale-100 opacity-100': !copied(),
							}"
							hlm
							name="lucideCopy"
							size="sm"
						/>
						<ng-icon
              class="absolute text-emerald-500 dark:text-emerald-400 dark:text-shadow-xs dark:text-shadow-emerald-100 transition-all"
							[ngClass]="{
								'scale-0 opacity-0': !copied(),
								'scale-100 opacity-100': copied(),
							}"
							hlm
							name="lucideCheck"
							size="sm"
						/>
					</button>
				</div>
			}
		</hlm-tabs>
	`,
	providers: [provideIcons({ lucideCopy, lucideCheck })],
	imports: [NgClass, HlmTabsImports, HlmTooltipImports, HlmIconImports, HlmButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Installer {
	#clipboard = inject(Clipboard);

	packageName = input.required();

	readonly packageManagers: PackageManager[] = [
		{ id: 'npm', cmd: 'i' },
		{ id: 'pnpm', cmd: 'i' },
		{ id: 'bun', cmd: 'add' },
		{ id: 'yarn', cmd: 'add' },
	];

	copied = signal<boolean>(false);

	public copy(pm: PackageManager): void {
		this.copied.set(true);
		const command = `${pm.id} ${pm.cmd} ${this.packageName()}@latest`;
		this.#clipboard.copy(command);

		setTimeout(() => {
			this.copied.set(false);
		}, 1500);
	}
}
