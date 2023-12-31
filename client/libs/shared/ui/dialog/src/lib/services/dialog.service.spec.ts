import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { provideMock } from '@bookish-list/shared/testing';
import { DialogConfig } from '../models/dialog.models';

import { DialogService } from './dialog.service';

@Component({
  template: '',
})
export class DummyComponentMock {}

describe('DialogService', () => {
  let service: DialogService;
  let matDialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [provideMock(MatDialog)],
    });

    matDialog = TestBed.inject(MatDialog);
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('open', () => {
    it('should call mat dialog open', () => {
      // arrange
      const config = {
        disableClose: false,
      } as DialogConfig;

      const openSpy = jest.spyOn(matDialog, 'open');

      // act
      service.open(DummyComponentMock, config);

      // assert
      expect(openSpy).toHaveBeenCalledWith(DummyComponentMock, config);
    });
  });
});
