/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nx-ng-electron-sample-main-page-container',
  template: `
    <nx-ng-electron-sample-left-side-nav
      class="ele-leftnav"
    ></nx-ng-electron-sample-left-side-nav>
    <div class="ele-page">
      <router-outlet></router-outlet>
      <nx-ng-electron-sample-footer
        class="ele-footer"
      ></nx-ng-electron-sample-footer>
    </div>
  `,
  styles: [
    '.ele-leftnav { flex: 25%; align-self: center; width: 100%; text-align: center; }',
    '.ele-page { flex: 75% }',
  ],
})
export class MainPageContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
