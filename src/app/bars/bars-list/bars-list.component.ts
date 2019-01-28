import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../../auth/auth.service';
import { switchMap} from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/firestore";
@Component({
  selector: 'pdi-bars-list',
  templateUrl: './bars-list.component.html',
  styleUrls: ['./bars-list.component.scss']
})
export class BarsListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  itemColumns = ['lyrics', 'track', 'prod'];
  constructor(public auth:AuthService, public afs: AngularFirestore) { }

  ngOnInit() {
    this.auth.user
      .pipe(
        switchMap(user => {
          return this.afs.collection<any>(`bars/${user.uid}/lyrics`).valueChanges()
        })
      ).subscribe(barsList => {
        this.dataSource = new MatTableDataSource(barsList)
      })
  }

}
