export function designTheOutput() {
    // Helper function to create a horizontal line
    const createLine = (width: number, char: string = "-"): string => {
        return char.repeat(width);
    };

    // Helper function to center-align text within a box
    const centerText = (text: string, width: number): string => {
        const space = Math.max(0, width - text.length);
        const padStart = Math.floor(space / 2);
        const padEnd = space - padStart;
        return " ".repeat(padStart) + text + " ".repeat(padEnd);
    };

    return {createLine, centerText};
}