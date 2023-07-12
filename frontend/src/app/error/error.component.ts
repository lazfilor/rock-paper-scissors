import {Component, OnInit} from '@angular/core';
import {errorConfiguration} from '../shared/error-configuration';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'rps-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit{

  errorText!: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
   const idParam = this.activatedRoute.snapshot.paramMap.get(errorConfiguration.idPath);
    this.setError(idParam);
  }

  setError(id: string | null) {

    if (id !== null && Object.keys(errorConfiguration.types).includes(id)) {
      this.errorText = errorConfiguration.types[id];
    } else {
      this.errorText = errorConfiguration.types['default'];
    }
  }
}
