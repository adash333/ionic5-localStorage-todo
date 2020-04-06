import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = 'タスク一覧';
  todos: { name: string }[] = [
    { name: 'タスク1' },
    { name: 'タスク2' }
  ];
  // todo: string;

  constructor(
    public actionSheetController: ActionSheetController
  ) {}

  ionViewWillEnter() {
    if ('todos' in localStorage) {
      this.todos = JSON.parse(localStorage.todos);
    }
  }

  async changeTodo(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'タスクの変更',
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Destructive clicked');
            this.todos.splice(index, 1);
            localStorage.tasks = JSON.stringify(this.todos);
          }
        }, {
          text: '変更',
          icon: 'create',
          handler: () => {
            console.log('Active clicked');
          }
        }, {
          text: '閉じる',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
      ]
    });
    await actionSheet.present();
  }

}
