import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkComponent ]
    })
      .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    component.address = 'https://google.com';
    component.openInNewWindow = true;
    fixture.detectChanges();

    const link = (fixture.debugElement.nativeElement as HTMLElement).querySelector('a');
    expect(link.getAttribute('href')).toBe('https://google.com');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it('should add target="_blank" attribute when openInNewWindow attribute is true', () => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    component.address = 'http://foo.com';
    fixture.detectChanges();

    const link = (fixture.debugElement.nativeElement as HTMLElement).querySelector('a');
    expect(link.hasAttribute('target')).not.toBeFalsy();
  });

  it('should throw an error when address attribute is not present', () => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;

    expect(() => fixture.detectChanges()).toThrow();
  });

  it('should throw an error when address attribute is not valid hyperlink', () => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    component.address = 'foo bar';

    expect(() => fixture.detectChanges()).toThrow();
  });
});
