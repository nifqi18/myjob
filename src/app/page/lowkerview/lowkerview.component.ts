import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PekerjaanService } from '@app/service/pekerjaan.service';

@Component({
  selector: 'dbs-lowkerview',
  templateUrl: './lowkerview.component.html',
  styleUrls: ['./lowkerview.component.scss'],
  
})
export class LowkerviewComponent implements OnInit {

  constructor(private route : ActivatedRoute , private api : PekerjaanService) { }
  public loading = this.api.loading$;

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.api.GetLowkerById(id).subscribe(x => {
      console.log(x);
    })
    
  }

}
