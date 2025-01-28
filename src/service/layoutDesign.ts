export class layoutDesign {
    static designTheOutput() {
        const createLine = (width: number, char: string = "-"): string => {
            return char.repeat(width);
        };
    
        const centerText = (text: string, width: number): string => {
            const space = Math.max(0, width - text.length);
            const padStart = Math.floor(space / 2);
            const padEnd = space - padStart;
            return " ".repeat(padStart) + text + " ".repeat(padEnd);
        };
    
        return {createLine, centerText};
    }
}