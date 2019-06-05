import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss']
})
export class CurrencyInputComponent {

  @Output() ammountOwnedChanged: EventEmitter<void> = new EventEmitter();

  /**
   * Crypto currency short code 
   * Used for storing user coin ammount in localStorage
   */
  @Input() currencyShortCode: number;

  /**
   * Input field value
   * 
   * @type {number}
   */
  @Input() public amountYouOwn: number;

  /**
   * Saves entered ammount to localStorage and triggers total coin value calculation
   */
  public submitAmmount(): void {
    localStorage.setItem(`${this.currencyShortCode}`, this.amountYouOwn.toString());
    this.ammountOwnedChanged.emit();
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
