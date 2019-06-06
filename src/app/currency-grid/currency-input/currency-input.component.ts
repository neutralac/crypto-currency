/**
 * Currency grid user currency count component
 * 
 * @author Milan Vidojevic
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss']
})
export class CurrencyInputComponent implements OnInit {

  /**
   * EventEmitter triggered when user submits currency count
   * Used to trigger view data calculations
   * 
   * @type {EventEmitter}
   */
  @Output() ammountOwnedChanged: EventEmitter<void> = new EventEmitter();

  /**
   * Input field value
   * 
   * @type {number}
   */
  @Input() public amountYouOwn: number;

  /**
   * Crypto currency short code 
   * Used for storing user coin ammount in localStorage
   * 
   * @type {string}
   */
  @Input() currencyShortCode: string;

  /**
   * True if valid number has been entered, false otherwise
   * Used for Submit button validation
   * 
   * @type {boolean}
   */
  public isValid: boolean = false;

  /**
   * Angular lifecycle hook
   * Updates ammountYouOwn if it exists, else does nothing
   */
  public ngOnInit(): void {
    let previousValue = localStorage.getItem(this.currencyShortCode);
    if (previousValue) {
      this.amountYouOwn = parseInt(previousValue);
      this.isValid = true;
    }
  }

  /**
   * Updates validation properties for Submit button validation on user input
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

  /**
   * Saves entered ammount to localStorage and triggers total coin value calculation
   */
  public submitAmmount(): void {
    localStorage.setItem(this.currencyShortCode, this.amountYouOwn.toString());
    this.ammountOwnedChanged.emit();
  }
}
