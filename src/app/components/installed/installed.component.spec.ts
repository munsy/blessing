import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalledComponent } from './installed.component';
import { TranslateModule } from '@ngx-translate/core';

describe('InstalledComponent', () => {
  let component: InstalledComponent;
  let fixture: ComponentFixture<InstalledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstalledComponent ],
      imports: [
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstalledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('PAGES.HOME.TITLE');
  }));
});
