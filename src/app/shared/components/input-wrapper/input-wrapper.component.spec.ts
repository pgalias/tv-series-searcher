// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { InputWrapperComponent } from './input-wrapper.component';
//
// describe('InputWrapperComponent', () => {
//   let component: InputWrapperComponent;
//   let fixture: ComponentFixture<InputWrapperComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ InputWrapperComponent ]
//     })
//     .compileComponents();
//   }));
//
//   it('should create when receives at least one input type child', () => {
//     fixture = TestBed.createComponent(InputWrapperComponent);
//     component = fixture.componentInstance;
//     (fixture.elementRef.nativeElement as HTMLElement).innerHTML = '<input type="text">';
//     console.log('fixture.elementRef.nativeElement', fixture.elementRef.nativeElement);
//     fixture.detectChanges();
//     expect(component).toBeTruthy();
//   });
//
//   it('should throw an error when component does not receive at least one input type child', () => {
//     expect(() => {
//       fixture = TestBed.createComponent(InputWrapperComponent);
//       component = fixture.componentInstance;
//       fixture.detectChanges();
//     }).toThrowError();
//   });
// });
