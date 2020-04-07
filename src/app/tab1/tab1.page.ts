import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TmplAstBoundAttribute } from '@angular/compiler';

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
    public actionSheetController: ActionSheetController,
    public alertController: AlertController
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
            localStorage.todos = JSON.stringify(this.todos);
          }
        }, {
          text: '変更',
          icon: 'create',
          handler: () => {
            console.log('Active clicked');
            this._renameTodo(index);
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

  async _renameTodo(index: number) {
    const prompt = await this.alertController.create({
      header: '変更後のタスク',
      inputs: [
        {
          name: 'todo',
          placeholder: 'タスク',
          value: this.todos[index].name
        },
      ],
      buttons: [
        {
          text: '閉じる'
        },
        {
          text: '保存',
          handler: data => {
            this.todos[index] = { name: data.todo };
            localStorage.todos = JSON.stringify(this.todos);
          }
        }
      ]
    });
    prompt.present();
  }

}
