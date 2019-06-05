import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss']
})
export class CurrencyInputComponent implements OnInit {

  @Output() ammountOwnedChanged: EventEmitter<void> = new EventEmitter();

  /**
   * Crypto currency short code 
   * Used for storing user coin ammount in localStorage
   */
  @Input() currencyShortCode: string;

  /**
   * Input field value
   * 
   * @type {number}
   */
  @Input() public amountYouOwn: number;

  public isValid: boolean = false;

  public ngOnInit(): void {
    let previousValue = localStorage.getItem(this.currencyShortCode);
    if (previousValue) {
      this.amountYouOwn = parseInt(previousValue);
      this.isValid = true;
    }
  }

  /**
   * Saves entered ammount to localStorage and triggers total coin value calculation
   */
  public submitAmmount(): void {
    localStorage.setItem(this.currencyShortCode, this.amountYouOwn.toString());
    this.ammountOwnedChanged.emit();
  }

  /**
   * Updates amountYouOwn value to trigger button validation
   * 
   * @param {InputEvent} event Object containing click event data
   */
  public onUserInput(event: any): void {
    let value = event.target.value;
    let regex = /^[0-9]*$/;
    let isValid = false;
    if (value && regex.test(value)) {
      isValid = true;
    }
    this.isValid = isValid;
  }
}
