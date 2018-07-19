import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FileUploadComponent } from "./file-upload.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("FileUploadComponent", () => {

  let fixture: ComponentFixture<FileUploadComponent>;
  let component: FileUploadComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [FileUploadComponent]
    });

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
