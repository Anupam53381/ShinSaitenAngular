import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() title: string;
  @Input() active = false;
  @Input() ratingUnitId: string;
  @Input() isVisited: boolean;

  constructor() { }

  ngOnInit() {
  }

}
