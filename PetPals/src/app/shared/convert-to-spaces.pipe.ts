import { Pipe, PipeTransform } from "@angular/core";


// THIS CLASS IS A CUSTOM BUILT PIPE

@Pipe({
 name: 'convertToSpaces'   
})
export class ConvertToSpacesPipe implements PipeTransform {
    transform(value: string, character: string): string {
        return value.replace(character,  ' ');
    }

}