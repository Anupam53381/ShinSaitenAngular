import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  private testSetId: string;
  private testSetName: string;
  private ratingProjectId: string;
  constructor() { }
  public setTestSetId(testSetId: string) {
    this.testSetId = testSetId;
  }
  public getTestSetId(): string {
    return this.testSetId;
  }
  public setTestSetName(testSetName: string) {
    this.testSetName = testSetName;
  }
  public getTestSetName(): string {
    return this.testSetName;
  }
  public setRatingProjectId(ratingProjectId: string) {
    this.ratingProjectId = ratingProjectId;
  }
  public getRatingProjectId(): string {
   return this.ratingProjectId;
  }

}
