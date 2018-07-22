import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NumberViewComponent } from "./number-view.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("NumberViewComponent", () => {

  let fixture: ComponentFixture<NumberViewComponent>;
  let component: NumberViewComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [NumberViewComponent]
    });

    fixture = TestBed.createComponent(NumberViewComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
