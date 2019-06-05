import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss']
})
export class CurrencyInputComponent {

  @Input() public amountYouOwn: number;

  public submitAmmount() {
    if (this.amountYouOwn) {

    }
  }

  /**
   * Updates amountYouOwn value to trigger button validation
   * 
   * @param {InputEvent} event Object containing click event data
   */
  public onUserInput(event: any): void {
    let value = event.target.value;
    let amountYouOwn = null;
    if (value) {
      amountYouOwn = parseInt(event.target.value);
    }
    this.amountYouOwn = amountYouOwn;
  }
}
