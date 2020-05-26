import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BoeService } from "./boe.service";
import { defaultDocumento } from "../models";
import { of } from "rxjs";
import { doesNotReject } from "assert";

describe("BoeService", () => {
  let service: BoeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BoeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return a list of anuncios", (done) => {
    const ads$ = of([defaultDocumento()]);

    const callApiSpy = jest.spyOn(service, "getAds").mockReturnValue(ads$);
    service.getAds("20200520");

    ads$.subscribe((document) => {
      expect(document).toHaveLength(1);
      done();
    });

    expect(callApiSpy).toHaveBeenCalled();
  });
});
