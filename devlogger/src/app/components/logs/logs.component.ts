import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false;

  constructor(private logService: LogService) { }

  ngOnInit() {
    //Cada vez que é adicionado ou editado um log, o log-form dispara o logService.clearState().
    //É recebido novamente clear=true e limpa o log highlighted (selectedLog)
    this.logService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedLog = { id: '', text: '', date: '' };
      }
    });
    /*Option 1 - receiving all the logs at once*/
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });

    /*Option 2 - receiving a log at each time to give the feeling of loading*/
    // this.logs = []; //Initialization
    // this.logService.getLogs().subscribe(
    //   log => {
    //     this.logs.unshift(log);
    //   }, e => console.log('onError: %s', e),
    //   () => {
    //     console.log('onCompleted');
    //     this.loaded = true;
    // });
  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    if (confirm('Are you sure?')) {
      this.logService.deleteLog(log);
    }
  }
}
