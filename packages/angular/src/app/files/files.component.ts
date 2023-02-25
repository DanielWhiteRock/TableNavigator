import { Component, OnInit } from '@angular/core';
import { File } from '@daniel/common-types'
import { TableService } from '../table.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  files: File[] = [];

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.getTables();
  }

  getTables(): void {
    this.tableService.getTables()
    .subscribe(tables => this.files = tables);
  }
}
