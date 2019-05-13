//import { RatingService } from '../../../../modules/rating/services/rating.service';
import { RatingBasis } from '../../../../modules/rating/models/rating-basis.model';
import { RatingComponent } from '../../../../modules/rating/rating/rating.component';
import { RatingService } from '../../../../modules/rating/services/rating.service';
import { TabComponent } from './../tab/tab.component';

import {
  Component,
  OnInit,
  ContentChildren,
  QueryList
} from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;
  testStr: string;

  ratingUnitContext: Map<string, string>;
  constructor(private ratingService: RatingService, private ratingComponent: RatingComponent) {}

  ngOnInit() {
    console.log("initializing tabs");

    this.ratingUnitContext = new Map<string, string>();
  }

  selectTab(tab: TabComponent) {
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => (tab.active = false));

    tab.isVisited = true;

    // activate the tab the user has clicked on.
    tab.active = true;

    this.ratingUnitContext.set(tab.ratingUnitId, tab.title);

    this.ratingUnitContext.forEach((value: string, key: string) => {
      console.log("visited tabs: " + value);
    });
  }
}
