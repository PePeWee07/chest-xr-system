import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit {

  constructor(private _liveAnnouncer: LiveAnnouncer, private usersService: AuthService) {}

  // displayedColumns: string[] = ['name', 'climate', 'diameter', 'gravity'];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataUsers: any[] = [];

  // dataSource = new MatTableDataSource<any>(this.dataUsers);
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.tv()
  }

  getUsers(){
    this.usersService.getUserRegisters().subscribe(
      (res) => {
        var {id, nombre, apellido, direccion} = res;
        this.dataUsers.push({id, nombre, apellido, direccion});
        
        this.dataSource = new MatTableDataSource<any>(this.dataUsers);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      }, (err) => {
        console.log(err);
      }, () => {
        console.log("EXITO");
      }
    )
  }

  tv(){
    this.usersService.tv().subscribe(
      (res) => {
        var {name, climate, diameter, gravity} = res;
        this.dataUsers.push({name, climate, diameter, gravity});

        this.dataSource = new MatTableDataSource<any>(this.dataUsers);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      }, (err) => {
        console.log(err);
      }, () => {
        console.log("EXITO");
      }
    )
  }

  //Anunciador de Sort (Ingles)
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      console.log("if: ", this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`));
      
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
      console.log( "else: ", this._liveAnnouncer.announce('Sorting cleared'));
    }
  }

  //Filtro para el paginador
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];