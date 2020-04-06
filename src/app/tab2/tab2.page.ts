import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  title = 'TODO登録';
  todos: { name: string }[];
  todo: string;
  constructor() {}

  ionViewWillEnter() {
    if ('todos' in localStorage) {
      this.todos = JSON.parse(localStorage.todos);
    }
  }

  addTodo() {
    // todos配列の最後に、this.taskを追加する
    this.todos.push({
      name: this.todo
    });
    // localStorageのtodosという場所に、this.todosを文字列に変換したものを保存する
    localStorage.todos = JSON.stringify(this.todos);
    // this.todoを空文字にする
    this.todo = '';
  }

}
