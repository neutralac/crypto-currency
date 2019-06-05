import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'cryptoCurrencyPipe'
})
export class CryptoCurrencyPipe implements PipeTransform {

    /**
     * @inheritdoc
     */
    transform(value: number): string {
        return `\$ ${value.toFixed(2)}`;
    }
}