import { Component, Input } from '@angular/core';

@Component({
  selector: 'simple-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent  {
  @Input() rows:  number | undefined;
  @Input() columns:  number | undefined;
  @Input() data: string | undefined;


}
