import { Component, OnInit } from '@angular/core';
import { Table } from '@daniel/common-types'
import { TableService } from '../table.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  tables: Table[] = [];

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.getTables();
  }

  getTables(): void {
    this.tableService.getTables()
      .subscribe(tables => this.tables = tables);
  }
}
