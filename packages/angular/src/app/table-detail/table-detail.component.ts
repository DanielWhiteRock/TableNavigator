import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Table } from '@daniel/common-types'

import { TableService } from '../table.service';

@Component({
  selector: 'cdk-accordion-overview-example', //'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: [ './table-detail.component.css' ]
})
export class TableDetailComponent implements OnInit {
  table: Table[] | undefined;
  items: string[] = [];
  expandedIndex = 0;
  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTable();
  }

  getTable(): void {
    const id = this.route.snapshot.paramMap.get('id') || ''
    this.tableService.getTable(id)
      .subscribe(table => {
          this.table = table.tables
          this.items = table.tables.map((item: Table) => item.name)
        });

  }

  goBack(): void {
    this.location.back();
  }
}
